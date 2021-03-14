import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls";
import { ImprovedNoise } from "three/examples/jsm/math/ImprovedNoise";
import { Colours } from "../Global/global.styles";
import TreeG from "../../Assets/Models/Tree.glb";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import BatFlying from "../../Assets/Audio/BAT_FLYING.mp3";
import BatSounds from "../../Assets/Audio/BAT_SOUNDS.mp3";
import TrainOne from "../../Assets/Audio/TRAIN_ONE.mp3";
import TrainTwo from "../../Assets/Audio/TRAIN_TWO.mp3";
import {EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import {RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import {NodePass } from 'three/examples/jsm/nodes/postprocessing/NodePass'
import * as Nodes from 'three/examples/jsm/nodes/Nodes'
const style = {
  height: "100vh" // we can control scene size by setting container dimensions
};

class TerrainEnvironment extends Component {
  width;
  height;
  clock;
  worldWidth = 128;
  worldDepth = 128;
  numberOfTrees = 50;
  terrainSize = 7500;
  nodePost;
  frame;
  
  componentDidMount() {
    this.init();
    this.startAnimationLoop();

    this.addEventListeners();
  }

  componentWillUnmount() {
    this.removeEventListeners();
    window.cancelAnimationFrame(this.requestID);
    this.controls.dispose();
    // this.batSound.disconnect()
    // this.trainSound.disconnect()
    // this.music.disconnect()
  }

  init = () => {
    this.setupScene();
    this.setupCamera();
    this.createTerrain();
    this.addLights();
    this.setupLoadingManager();
    this.setupRenderer();
    this.setupPostProcessing()
    this.setupControl();
    // this.setupGrid();
    this.createAudioListener();
    this.loadAudio();
    this.addTree();
    this.clock = new THREE.Clock();
  };

  setupPostProcessing = () => {
    this.frame = new Nodes.NodeFrame();
    this.composer = new EffectComposer(this.renderer)
    this.composer.addPass(new RenderPass(this.scene, this.camera))

    this.invertPass = new NodePass()
    this.saturationPass = new NodePass()
    this.blurPass = new NodePass()

    this.composer.addPass(this.invertPass)
    this.composer.addPass(this.saturationPass)
    this.composer.addPass(this.blurPass)

    const alpha = new Nodes.FloatNode( 1 );

		this.screen = new Nodes.ScreenNode();
		const inverted = new Nodes.MathNode( this.screen, Nodes.MathNode.INVERT );

		let fade = new Nodes.MathNode(
							this.screen,
							inverted,
							alpha,
							Nodes.MathNode.MIX
						);

    this.invertPass.input = fade;
    

    let screen = new Nodes.ScreenNode();
    const sat = new Nodes.FloatNode( 0 );

    const satrgb = new Nodes.FunctionNode( [
      "vec3 satrgb( vec3 rgb, float adjustment ) {",
      // include luminance function from LuminanceNode
      "	vec3 intensity = vec3( luminance( rgb ) );",
      "	return mix( intensity, rgb, adjustment );",
      "}"
    ].join( "\n" ), [ Nodes.LuminanceNode.Nodes.luminance ] );

    const saturation = new Nodes.FunctionCallNode( satrgb );
    saturation.inputs.rgb = screen;
    saturation.inputs.adjustment = sat;

    this.saturationPass.input = saturation; 

    const size = this.renderer.getDrawingBufferSize( new THREE.Vector2() );

		const blurScreen = new Nodes.BlurNode( new Nodes.ScreenNode() );
    blurScreen.size = new THREE.Vector2( size.width, size.height );


    this.blurPass.input = blurScreen;
    blurScreen.radius.x = 0
    blurScreen.radius.y = 0
  }

  setupLoadingManager = () => {
    this.manager = new THREE.LoadingManager();
    this.manager.onStart = this.loadStart;
    this.manager.onProgress = this.loadProgressing;
    this.manager.onLoad = this.loadFinished;
  };

  loadStart = (url, itemsLoaded, itemsTotal) => {
    console.log("STARTED");
  };

  loadProgressing = (url, itemsLoaded, itemsTotal) => {
    console.log(url);
    console.log(itemsLoaded, itemsTotal);
  };

  loadFinished = () => {
    this.addMultipleTrees()

    // this.props.hasLoaded();
    this.onWindowResize();
  };

  createAudioListener = () => {
    this.listener = new THREE.AudioListener();
    this.camera.add(this.listener);
  };

  loadAudio = () => {
    let musicLoader = new THREE.AudioLoader(this.manager);
    let batSoundLoader = new THREE.AudioLoader(this.manager);
    let trainSoundLoader = new THREE.AudioLoader(this.manager);
    let batFlyingSoundLoader = new THREE.AudioLoader(this.manager);

    this.music = new THREE.PositionalAudio(this.listener);
    this.batSound = new THREE.PositionalAudio(this.listener);
    this.trainSound = new THREE.PositionalAudio(this.listener)
    this.batFlying= new THREE.PositionalAudio(this.listener)

    musicLoader.load(TrainTwo, buffer => {
      this.music.setBuffer(buffer);
      // this.music.play();
      this.createMusicSpeaker();
    });

    batSoundLoader.load(BatSounds, buffer => {
      this.batSound.setBuffer(buffer);
      // this.music.play();
      this.createBatSpeaker();
    });

    batFlyingSoundLoader.load(BatFlying, buffer => {
      this.batFlying.setBuffer(buffer);
      // this.music.play();
      this.createBatFlyingSpeaker();
    });

    trainSoundLoader.load(TrainOne, buffer => {
      this.trainSound.setBuffer(buffer);
      // this.music.play();
      this.createTrainSpeaker();
    });

  };

  createTrainSpeaker = () => {
    //Music
    let sphere = new THREE.SphereGeometry(20, 32, 16);
    let material = new THREE.MeshPhongMaterial({ color:'orange' });
    let mesh = new THREE.Mesh(sphere, material);
    mesh.position.set(0, 1500, 0);
    this.scene.add(mesh);
    mesh.add(this.music);
    this.trainSound.setRefDistance(20);
    this.trainSound.play();
  };

  createMusicSpeaker = () => {
    //Music
    let sphere = new THREE.SphereGeometry(20, 32, 16);
    let material = new THREE.MeshPhongMaterial({ color: 0xff2200 });
    let mesh = new THREE.Mesh(sphere, material);
    mesh.position.set(4000, 1500, 0);
    this.scene.add(mesh);
    mesh.add(this.music);
    this.music.setRefDistance(25);
    this.music.play();
  };

  createBatSpeaker = () => {
    //Music
    let sphere = new THREE.SphereGeometry(20, 32, 16);
    let material = new THREE.MeshPhongMaterial({ color: 'yellow' });
    let mesh = new THREE.Mesh(sphere, material);
    mesh.position.set(500, 1500, 3000);
    this.scene.add(mesh);
    mesh.add(this.music);
    this.batSound.setRefDistance(20);
    this.batSound.play();
  };

  createBatFlyingSpeaker = () => {
    //Music
    let sphere = new THREE.SphereGeometry(20, 32, 16);
    let material = new THREE.MeshPhongMaterial({ color: 'yellow' });
    let mesh = new THREE.Mesh(sphere, material);
    mesh.position.set(500, 1500, -2500);
    this.scene.add(mesh);
    mesh.add(this.music);
    this.batFlying.setRefDistance(40);
    this.batFlying.play();
  };
  addLights = () => {
    const width = this.terrainSize;
    const height = this.terrainSize;
    const intensity = 10;
    const rectLight = new THREE.RectAreaLight(
      0xffffff,
      intensity,
      width,
      height
    );
    rectLight.position.set(5, 5000, 0);
    rectLight.lookAt(0, 1000, 0);
    this.scene.add(rectLight);
    const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    this.scene.add(light);
  };

  addTree = () => {
    const loader = new GLTFLoader(this.manager);
    this.tree = new THREE.Object3D();

    loader.load(TreeG, gltf => {
      this.mesh = gltf.scene;
      // console.log('MESH', this.mesh)
      this.mesh.scale.multiplyScalar(50);
      // this.addMultipleTrees();
      
    });

    // mesh.visible = true;
  };

  addMultipleTrees = () => {
    let noiseData = this.generateHeight(this.worldWidth, this.worldDepth);

    for (let x = 0; x < this.worldDepth; x++) {
      for (let y = 0; y < this.worldDepth; y++) {
        let index = y * this.worldDepth + x;
        if (noiseData[index] > 95) {
          let mesh = this.mesh.clone();
          let px =
            this.terrainSize * (x / this.worldDepth) - this.terrainSize / 2;
          let py =
            this.terrainSize * (y / this.worldDepth) - this.terrainSize / 2;
          let randomSize = (Math.random() * 10) - 5;
          mesh.position.set(
            x - this.worldWidth / 2 + px + randomSize,
            noiseData[index] * 10,
            y - this.worldWidth / 2 + py
          );
          const lod = new THREE.LOD();
          for (let i = 0; i < 3; i++) {
            if(i = 0) {
              mesh.visible = false;
            }
            lod.addLevel(mesh, i * 500);
          }
          this.scene.add(lod);
        }
      }
    }
  };

  // Standard scene setup in Three.js. Check "Creating a scene" manual for more information
  // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
  setupScene = () => {
    // get container dimensions and use them for scene sizing
    this.width = this.mount.clientWidth;
    this.height = this.mount.clientHeight;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xefd1b5);
    this.scene.fog = new THREE.FogExp2(0xefd1b5, 0.0005);
  };

  setupGrid = () => {
    const gridHelper = new THREE.GridHelper(this.worldWidth, this.worldWidth);
    this.scene.add(gridHelper);
    const axesHelper = new THREE.AxesHelper(5);
    this.scene.add(axesHelper);
  };

  setupCamera = () => {
    this.camera = new THREE.PerspectiveCamera(
      60,
      this.width / this.height,
      1,
      5000
    );
    this.camera.position.set(100, 800, -1600);
    this.camera.lookAt(-100, 810, -800);
  };

  createTerrain = () => {
    const data = this.generateHeight(this.worldWidth, this.worldDepth);
    this.geometry = new THREE.PlaneGeometry(
      this.terrainSize,
      this.terrainSize,
      this.worldWidth - 1,
      this.worldDepth - 1
    );
    this.geometry.rotateX(-Math.PI / 2);

    this.vertices = this.geometry.attributes.position.array;
    // console.log('VERT', this.vertices)
    for (let i = 0, j = 0, l = this.vertices.length; i < l; i++, j += 3) {
      this.vertices[j + 1] = data[i] * 10;
    }

    this.texture = new THREE.CanvasTexture(
      this.generateTexture(data, this.worldWidth, this.worldDepth)
    );
    this.texture.wrapS = THREE.ClampToEdgeWrapping;
    this.texture.wrapT = THREE.ClampToEdgeWrapping;

    this.mesh = new THREE.Mesh(
      this.geometry,
      new THREE.MeshBasicMaterial({
        map: this.texture,
        side: THREE.DoubleSide,
        color: new THREE.Color("grey"),
        reflectivity: 0.8
      })
      // new THREE.MeshPhongMaterial({
      //   side: THREE.DoubleSide,
      //   map: this.texture,
      //   color: new THREE.Color("yellow"),
      //   emissive: new THREE.Color(0xeee),
      //   reflectivity: 1.0
      // })
      // new THREE.MeshBasicMaterial({wireframe: true})
    );
    this.scene.add(this.mesh);
  };

  setupControl = () => {
    // this.controls = new OrbitControls(this.camera, this.mount);
    this.controls = new FirstPersonControls(this.camera, this.mount);
    this.controls.movementSpeed = 1500;
    this.controls.lookSpeed = 0.1;

    // this.controls.activeLook = false
    // this.controls.constrainVertical = true
    // this.controls.verticalMax = 0.5 * Math.PI
    // this.controls.movementSpeed = 1.2;
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
    this.controls.update(this.clock.getDelta());
    // this.renderer.render(this.scene, this.camera);
    this.frame.update( this.clock.getDelta() ).updateNode( this.invertPass.material );

    this.composer.render();
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
