(function() {
  var currentDomain = window.location.protocol + '//' + window.location.host;
  var currentPath = window.location.pathname;
  var isRegisterDomain = currentDomain.includes('khelo24register');
  var isHomePage = currentPath === '/' || currentPath === '/index.html';
  
  // Update canonical
  var canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.href = currentDomain + currentPath;
  }
  
  // Update og:url
  var ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) {
    ogUrl.content = currentDomain + currentPath;
  }
  
  // Update og:image
  var ogImage = document.querySelector('meta[property="og:image"]');
  if (ogImage && /https:\/\/www\.(khelo24info|kheloo24|khelo24register)\.live/.test(ogImage.content)) {
    ogImage.content = ogImage.content.replace(/https:\/\/www\.(khelo24info|kheloo24|khelo24register)\.live/g, currentDomain);
  }
  
  // Update manifest
  var manifest = document.querySelector('link[rel="manifest"]');
  if (manifest && /https:\/\/www\.(khelo24info|kheloo24|khelo24register)\.live/.test(manifest.href)) {
    manifest.href = manifest.href.replace(/https:\/\/www\.(khelo24info|kheloo24|khelo24register)\.live/g, currentDomain);
  }
  
  // Update apple-touch-icon
  var appleIcon = document.querySelector('link[rel="apple-touch-icon"]');
  if (appleIcon && /https:\/\/www\.(khelo24info|kheloo24|khelo24register)\.live/.test(appleIcon.href)) {
    appleIcon.href = appleIcon.href.replace(/https:\/\/www\.(khelo24info|kheloo24|khelo24register)\.live/g, currentDomain);
  }
  
  // Update favicon
  var favicon = document.querySelector('link[rel="icon"]');
  if (favicon && /https:\/\/www\.(khelo24info|kheloo24|khelo24register)\.live/.test(favicon.href)) {
    favicon.href = favicon.href.replace(/https:\/\/www\.(khelo24info|kheloo24|khelo24register)\.live/g, currentDomain);
  }
  
  // Update Twitter image
  var twitterImage = document.querySelector('meta[name="twitter:image"]');
  if (twitterImage && /https:\/\/www\.(khelo24info|kheloo24|khelo24register)\.live/.test(twitterImage.content)) {
    twitterImage.content = twitterImage.content.replace(/https:\/\/www\.(khelo24info|kheloo24|khelo24register)\.live/g, currentDomain);
  }
  
  // Rewrite any remaining absolute internal links/attributes to current domain
  var internalDomainRegex = /https:\/\/www\.(khelo24info|kheloo24|khelo24register)\.live/;
  document.querySelectorAll('a[href*=".live"], link[href*=".live"], img[src*=".live"], script[src*=".live"], source[src*=".live"]').forEach(function(el) {
    if (el.href && internalDomainRegex.test(el.href)) {
      el.href = el.href.replace(/https:\/\/www\.(khelo24info|kheloo24|khelo24register)\.live/g, currentDomain);
    }
    if (el.src && internalDomainRegex.test(el.src)) {
      el.src = el.src.replace(/https:\/\/www\.(khelo24info|kheloo24|khelo24register)\.live/g, currentDomain);
    }
  });
  
  // Domain-specific SEO for khelo24register.live
  if (isRegisterDomain && isHomePage) {
    // Update title
    var title = document.querySelector('title');
    if (title) {
      title.textContent = 'Khelo24 Register | Create Account & Access Online Gaming Platform';
    }
    
    // Update meta description
    var description = document.querySelector('meta[name="description"]');
    if (description) {
      description.content = 'Register with Khelo24 and create your account to access live games, entertainment categories, promotions and a smooth gaming experience.';
    }
    
    // Update og:title
    var ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.content = 'Khelo24 Register | Create Account & Access Online Gaming Platform';
    }
    
    // Update og:description
    var ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.content = 'Register with Khelo24 and create your account to access live games, entertainment categories, promotions and a smooth gaming experience.';
    }
    
    // Update H1 if exists
    var h1 = document.querySelector('h1');
    if (h1 && h1.textContent.includes('Khelo24 Online Gaming Platform')) {
      h1.textContent = 'Register Your Khelo24 Account';
    }
  }
  
  // Update JSON-LD schema
  var scripts = document.querySelectorAll('script[type="application/ld+json"]');
  scripts.forEach(function(script) {
    try {
      var data = JSON.parse(script.textContent);
      var updated = JSON.stringify(data).replace(/https:\/\/www\.(khelo24info|kheloo24|khelo24register)\.live/g, currentDomain);
      
      // Update WebPage name for register domain
      if (isRegisterDomain && isHomePage) {
        var parsed = JSON.parse(updated);
        if (parsed['@graph']) {
          parsed['@graph'].forEach(function(item) {
            if (item['@type'] === 'WebPage') {
              item.name = 'Khelo24 Register | Create Account & Access Online Gaming Platform';
              item.description = 'Register with Khelo24 and create your account to access live games, entertainment categories, promotions and a smooth gaming experience.';
            }
          });
          updated = JSON.stringify(parsed);
        }
      }
      
      script.textContent = updated;
    } catch(e) {}
  });
  
  // Fix popup close buttons
  // 1. Ensure lazy-loaded close images inside login popups load eagerly so the close area is clickable
  document.querySelectorAll('.login___popup img.lclose, .login___popup img.blClose, .login___popup img.llogo').forEach(function(img) {
    img.setAttribute('loading', 'eager');
    img.setAttribute('decoding', 'sync');
  });
  
  // 2. Open/close #login-popup (game "Please login with real ID" popup) without changing URL
  var gameLoginPopup = document.getElementById('login-popup');
  if (gameLoginPopup) {
    // Open popup when any game "Play Real" link is clicked
    document.body.addEventListener('click', function(e) {
      var opener = e.target.closest && e.target.closest('.khelo-open-popup');
      if (opener) {
        e.preventDefault();
        e.stopPropagation();
        gameLoginPopup.style.display = 'flex';
      }
    });
    // Close popup when X is clicked
    document.querySelectorAll('#login-popup .khelo-popup-close, .khelo-popup-close').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        gameLoginPopup.style.display = 'none';
        // Remove the #login-popup hash without reloading
        if (window.location.hash === '#login-popup') {
          history.replaceState(null, '', window.location.pathname + window.location.search);
        }
      });
    });
    // Also close when clicking the dark overlay background
    gameLoginPopup.addEventListener('click', function(e) {
      if (e.target === gameLoginPopup) {
        gameLoginPopup.style.display = 'none';
        if (window.location.hash === '#login-popup') {
          history.replaceState(null, '', window.location.pathname + window.location.search);
        }
      }
    });
  }
  
  // 3. Make sure the main login/register popups close when close icon is clicked
  document.querySelectorAll('.login___popup .lclose, .login___popup .blClose, .login___popup .close').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      var popup = this.closest('.login___popup');
      if (popup) {
        popup.style.display = 'none';
      }
    });
  });
})();
