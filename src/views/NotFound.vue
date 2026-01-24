<template>
  <div class="not-found">
    <div class="not-found-content">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Oops! The page you're looking for doesn't exist or has been moved.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>

<style scoped>
/* Import the Poppins font */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 120vh;
  font-family: 'Poppins', sans-serif;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
  margin-top: -80px;
}

.not-found-content {
  padding: 30px 20px; /* Reduced padding for mobile layout */
  border-radius: 15px;
  max-width: 375px; /* Mimic mobile screen width */
  width: 100%;
  margin: 0 auto; /* Center the content */
}

h1 {
  font-size: 4rem; /* Smaller font size for mobile */
  margin: 0;
  font-weight: 700;
  color: #000000; /* Black color for the 404 text */
  line-height: 1;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 1.5rem; /* Smaller font size for mobile */
  margin: 10px 0;
  font-weight: 600;
  color: #333; /* Dark gray for the heading */
}

p {
  font-size: 1rem; /* Smaller font size for mobile */
  margin: 20px 0;
  color: #555; /* Medium gray for the paragraph */
  line-height: 1.6;
}

.home-link {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px; /* Smaller padding for mobile */
  font-size: 0.9rem; /* Smaller font size for mobile */
  font-weight: 500;

  border-radius: 30px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(255, 255, 255, 0.1); /* Subtle shadow */
}

.home-link:hover {
  transform: translateY(-2px);

}

/* Fade-in animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>