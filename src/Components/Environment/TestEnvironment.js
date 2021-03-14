import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Colours } from "../Global/global.styles";
import TreeG from '../../Assets/Models/Tree.glb'

const style = {
  height: "100vh" // we can control scene size by setting container dimensions
};

class TestEnvironment extends Component {
    THREE;
  componentDidMount() {
    this.sceneSetup();
    this.startAnimationLoop();
    window.addEventListener("resize", this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
    window.cancelAnimationFrame(this.requestID);
    this.controls.dispose();
  }

  // Standard scene setup in Three.js. Check "Creating a scene" manual for more information
  // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
  sceneSetup = () => {
    // get container dimensions and use them for scene sizing
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xffffff)
    this.camera = new THREE.PerspectiveCamera(
      75, // fov = field of view
      width / height, // aspect ratio
      0.1, // near plane
      1000 // far plane
    );
    this.camera.position.z = 9; // is used here to set some distance from a cube that is located at z = 0
    // OrbitControls allow a camera to orbit around the object
    // https://threejs.org/docs/#examples/controls/OrbitControls
    this.controls = new OrbitControls(this.camera, this.mount);
    this.setupLoadingManager();
    this.addLights()
    this.addTree()
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor(Colours.green);

    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement); // mount using React ref
  };

  addLights = () =>{
    const lights = [];
    lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
    lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
    lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

    lights[ 0 ].position.set( 0, 200, 0 );
    lights[ 1 ].position.set( 100, 200, 100 );
    lights[ 2 ].position.set( - 100, - 200, - 100 );

    this.scene.add( lights[ 0 ] );
    this.scene.add( lights[ 1 ] );
    this.scene.add( lights[ 2 ] );
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
    console.log("LOADED");

    // this.props.hasLoaded();
    this.handleWindowResize();
  };

  addTree = () => {
    const loader = new GLTFLoader(this.manager);
    let mesh = new THREE.Object3D();

    loader.load(TreeG, gltf => {
      mesh = gltf.scene;
      this.scene.add(mesh);
      mesh.position.z = 0;
    });

    mesh.visible = true;
  };

  startAnimationLoop = () => {
    // this.cube.rotation.x += 0.01;
    // this.cube.rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera);

    // The window.requestAnimationFrame() method tells the browser that you wish to perform
    // an animation and requests that the browser call a specified function
    // to update an animation before the next repaint
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
  };

  handleWindowResize = () => {
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

export default TestEnvironment;
