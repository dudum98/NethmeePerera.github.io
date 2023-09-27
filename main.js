import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(50);
camera.position.setX(-30);

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Create the points sphere with radiant colors
const radius = 10;
const widthSegments = 11.5;
const heightSegments = 10;
const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
const material = new THREE.PointsMaterial({
  color: '#ffccff',
  size: 0.4, // in world units
  emissive: '#ffccff', // Add an emissive color to make it radiant
});

const points = new THREE.Points(geometry, material);
scene.add(points);

// Stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({
    emissive: new THREE.Color(Math.random(), Math.random(), Math.random()), // Random radiant color
  });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}

// Add more stars (customize the number as needed)
Array(500).fill().forEach(addStar);

// Scroll Animation
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  // Rotate the 'points' sphere
  points.rotation.x += 0.01;
  points.rotation.y += 0.005;
  points.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
}

animate();

// Additional code for navigation and job titles can remain as is

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section"); // Get all sections
  const navLinks = document.querySelectorAll("nav ul li a"); // Get all navigation links

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.7, 
  };

  const observer = new IntersectionObserver(handleIntersection, observerOptions);

  function handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const targetId = entry.target.id;

        // Remove "active" class from all links
        navLinks.forEach((link) => link.classList.remove("active"));

        // Add "active" class to the corresponding link
        const activeLink = document.querySelector(`nav ul li a[href="#${targetId}"]`);
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  }

  sections.forEach((section) => {
    observer.observe(section);
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const scrollButtons = document.querySelectorAll(".find-out-more-button");
  const logoLinks = document.querySelectorAll(".skill-item a");
  scrollButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = button.getAttribute("href").substring(1); 
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth", 
          block: "start", 
        });
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const jobTitles = document.querySelectorAll("#work-experience .job-title");

  jobTitles.forEach((title) => {
      title.addEventListener("click", function () {
          const jobDescription = this.nextElementSibling; // Get the description div
          jobDescription.classList.toggle("show-description"); // Toggle the "show-description" class on the description
      });
  });
});










