<template>
  <footer class="header-footer">
    <div class="header-footer-content">
      <h1 class="footer-name">Ready to Build Something Great?</h1>
      <p class="footer-subtitle">
        Whether you're building a product, launching a startup, or improving a system, 
        I'd love to collaborate and help bring your vision to life. 
      </p>
      <div class="footer-cta">
        <a 
          href="mailto:reymelrey.mislang@gmail.com?subject=Project%20Collaboration%20Inquiry"
          class="footer-contact-btn"
        >
          Start a Project
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
}

.main-content {
  padding-bottom: 0 !important;
  margin-bottom: 0 !important;
}

.profile-container {
  padding-bottom: 0 !important;
  margin-bottom: 0 !important;
}

.header-footer {
  width: 100vw;
  margin: 0;
  padding: 4rem 0 3rem;
  border-radius: 0;
  left: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}

@media (min-width: 992px) {
  .header-footer {
    min-height: 100vh;          /* FULL SCREEN HEIGHT */
    display: flex;
    align-items: center;        /* vertical center */
    justify-content: center;    /* horizontal center */
  }
}

/* Footer with Header Style */
.header-footer {
  width: 100vw;                 /* FULL WIDTH */
  margin: 0;         
  margin-top: 100px;           /* Desktop spacing */
  padding: 4rem 0 3rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;

  /* IMPORTANT */
  border-radius: 0;             /* REMOVE curve para sagad edge */
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}


.header-footer::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  right: -50%;
  bottom: -50%;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  z-index: 1;
}

.header-footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
}

.footer-name {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  letter-spacing: -1px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.footer-subtitle {
  font-size: 1.8rem;
  font-weight: 400;
  opacity: 0.95;
  margin-bottom: 1.5rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.4;
}

.footer-cta {
  margin-top: 2rem;
}

.footer-contact-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.2rem 2.5rem;
  background: white;
  color: #000000;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
}

.footer-contact-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.2), transparent);
  transition: left 0.5s ease;
}

.footer-contact-btn:hover::before {
  left: 100%;
}

.footer-contact-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.3);
  color: #764ba2;
}

.footer-contact-btn i {
  font-size: 1.3rem;
  transition: transform 0.3s ease;
}

.footer-contact-btn:hover i {
  transform: translateX(5px);
}

/* Responsive Design */
@media (max-width: 992px) {
  .footer-name {
    font-size: 3rem;
  }
  
  .footer-subtitle {
    font-size: 1.6rem;
  }
  
  /* Tablet adjustments */
  .header-footer {
    margin-top: 90px;
    padding: 3rem 0 2.5rem;
  }
}

@media (max-width: 768px) {
  .header-footer {
    margin-top: 80px;          /* Reduce space on tablet */
    padding: 2.5rem 0 2rem;
  }
  
  .footer-name {
    font-size: 2.5rem;
  }
  
  .footer-subtitle {
    font-size: 1.3rem;
    padding: 0 1rem;
  }
  
  .footer-contact-btn {
    padding: 1rem 2rem;
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .header-footer {
    margin-top: 45px;   /* controlled spacing */
    padding: 2.2rem 0 1.8rem;
  }


  
  .footer-name {
    font-size: 2rem;
    margin-bottom: 0.75rem;
  }
  
  .footer-subtitle {
    font-size: 1.1rem;
    line-height: 1.3;
    margin-bottom: 1.25rem;
  }
  
  .footer-contact-btn {
    padding: 0.9rem 1.8rem;
    font-size: 1rem;
    margin-top: 1rem;
  }
}

/* Remove desktop min-height on mobile */
@media (max-width: 991px) {
  .header-footer {
    min-height: auto !important; /* Remove full-screen height on mobile */
  }
}
</style>


<style scoped>
/* ===== GLOBAL STYLES ===== */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .header-footer {
    margin-top: 0 !important;
    padding-top: 2.5rem;   /* spacing instead of margin */
    padding-bottom: 2rem;
  }
}

@media (max-width: 480px) {
  .header-footer {
    margin-top: 0 !important;
    padding-top: 2.8rem;   /* visual separation */
    padding-bottom: 2rem;
  }
}


</style>