import React, { Component } from "react";
import * as THREE from "three";
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls";
import { ImprovedNoise } from "three/examples/jsm/math/ImprovedNoise";
import { Colours } from "../Global/global.styles";
const style = {
  height: "100vh" // we can control scene size by setting container dimensions
};

class TerrainEnvironment extends Component {
  width;
  height;
  clock;
  worldWidth = 256;
  worldDepth = 256;
  componentDidMount() {
    this.init();
    this.startAnimationLoop();

    this.addEventListeners();
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.requestID);
    this.removeEventListeners();
    this.controls.dispose();
  }

  init = () => {
    this.setupScene()
    this.setupCamera();
    this.createTerrain()
    this.setupRenderer();
    this.setupControl();
    this.clock = new THREE.Clock();


  }

  // Standard scene setup in Three.js. Check "Creating a scene" manual for more information
  // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
  setupScene = () => {
    // get container dimensions and use them for scene sizing
    this.width = this.mount.clientWidth;
    this.height = this.mount.clientHeight;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xefd1b5);
    this.scene.fog = new THREE.FogExp2(0xefd1b5, 0.0025);
  };

  setupCamera = () => {
    this.camera = new THREE.PerspectiveCamera(
      60,
      this.width / this.height,
      1,
      10000
    );
    this.camera.position.set(100, 800, -800);
    this.camera.lookAt(-100, 810, -800);
  };

  createTerrain = () => {
    const data = this.generateHeight( this.worldWidth, this.worldDepth );
    this.geometry = new THREE.PlaneGeometry(7500, 7500, this.worldWidth - 1, this.worldDepth -1);
    this.geometry.rotateX(-Math.PI/2);

    this.vertices = this.geometry.attributes.position.array;


    for ( let i = 0, j = 0, l = this.vertices.length; i < l; i ++, j += 3 ) {

        this.vertices[ j + 1 ] = data[ i ] * 10;

    }

    this.texture = new THREE.CanvasTexture(this.generateTexture(data, this.worldWidth, this.worldDepth));
    this.texture.wrapS = THREE.ClampToEdgeWrapping;
    this.texture.wrapT = THREE.ClampToEdgeWrapping;

    this.mesh = new THREE.Mesh(this.geometry, new THREE.MeshBasicMaterial({map: this.texture}))
    this.scene.add(this.mesh);

  };

  setupControl = () => {
    // this.controls = new OrbitControls(this.camera, this.mount);
    this.controls = new FirstPersonControls( this.camera, this.renderer.domElement );
	this.controls.movementSpeed = 150;
    this.controls.lookSpeed = 0.1;
  };

  setupRenderer = () => {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      premultipliedAlpha: true
    });
    this.renderer.setClearColor(Colours.grey);
    this.renderer.setSize(this.mount.clientWidth, this.mount.clientHeight);
    this.mount.appendChild(this.renderer.domElement); // mount using React ref
  };

  startAnimationLoop = () => {
      this.controls.update(this.clock.getDelta())
    this.renderer.render(this.scene, this.camera);

    // The window.requestAnimationFrame() method tells the browser that you wish to perform
    // an animation and requests that the browser call a specified function
    // to update an animation before the next repaint
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
  };

  generateHeight(width, height) {
    let seed = Math.PI / 4;
    window.Math.random = function() {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    const size = width * height,
      data = new Uint8Array(size);
    const perlin = ImprovedNoise(),
      z = Math.random() * 100;

    let quality = 1;

    for (let j = 0; j < 4; j++) {
      for (let i = 0; i < size; i++) {
        const x = i % width,
          y = ~~(i / width);
        data[i] += Math.abs(
          perlin.noise(x / quality, y / quality, z) * quality * 1.75
        );
      }

      quality *= 5;
    }

    return data;
  }

  generateTexture(data, width, height) {
    let context, image, imageData, shade;

    const vector3 = new THREE.Vector3(0, 0, 0);

    const sun = new THREE.Vector3(1, 1, 1);
    sun.normalize();

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    context = canvas.getContext("2d");
    context.fillStyle = "#000";
    context.fillRect(0, 0, width, height);

    image = context.getImageData(0, 0, canvas.width, canvas.height);
    imageData = image.data;

    for (let i = 0, j = 0, l = imageData.length; i < l; i += 4, j++) {
      vector3.x = data[j - 2] - data[j + 2];
      vector3.y = 2;
      vector3.z = data[j - width * 2] - data[j + width * 2];
      vector3.normalize();

      shade = vector3.dot(sun);

      imageData[i] = (96 + shade * 128) * (0.5 + data[j] * 0.007);
      imageData[i + 1] = (32 + shade * 96) * (0.5 + data[j] * 0.007);
      imageData[i + 2] = shade * 96 * (0.5 + data[j] * 0.007);
    }

    context.putImageData(image, 0, 0);

    // Scaled 4x

    const canvasScaled = document.createElement("canvas");
    canvasScaled.width = width * 4;
    canvasScaled.height = height * 4;

    context = canvasScaled.getContext("2d");
    context.scale(4, 4);
    context.drawImage(canvas, 0, 0);

    image = context.getImageData(0, 0, canvasScaled.width, canvasScaled.height);
    imageData = image.data;

    for (let i = 0, l = imageData.length; i < l; i += 4) {
      const v = ~~(Math.random() * 5);

      imageData[i] += v;
      imageData[i + 1] += v;
      imageData[i + 2] += v;
    }

    context.putImageData(image, 0, 0);

    return canvasScaled;
  }

  addEventListeners = () => {
    window.addEventListener("resize", this.onWindowResize, false);
  };

  removeEventListeners = () => {
    window.removeEventListener("resize", this.onWindowResize);
  };
  onWindowResize = () => {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    // Note that after making changes to most of camera properties you have to call
    // .updateProjectionMatrix for the changes to take effect.
    this.camera.updateProjectionMatrix();
  };

  render() {
    return <div style={style} ref={ref => (this.mount = ref)} />;
  }
}

export default TerrainEnvironment;
