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
  if (ogImage && ogImage.content.includes('khelo24info.live')) {
    ogImage.content = ogImage.content.replace(/https:\/\/www\.(khelo24info|kheloo24|khelo24register)\.live/, currentDomain);
  }
  
  // Update manifest
  var manifest = document.querySelector('link[rel="manifest"]');
  if (manifest && manifest.href.includes('khelo24info.live')) {
    manifest.href = manifest.href.replace(/https:\/\/www\.(khelo24info|kheloo24|khelo24register)\.live/, currentDomain);
  }
  
  // Update apple-touch-icon
  var appleIcon = document.querySelector('link[rel="apple-touch-icon"]');
  if (appleIcon && appleIcon.href.includes('khelo24info.live')) {
    appleIcon.href = appleIcon.href.replace(/https:\/\/www\.(khelo24info|kheloo24|khelo24register)\.live/, currentDomain);
  }
  
  // Update favicon
  var favicon = document.querySelector('link[rel="icon"]');
  if (favicon && favicon.href.includes('khelo24info.live')) {
    favicon.href = favicon.href.replace(/https:\/\/www\.(khelo24info|kheloo24|khelo24register)\.live/, currentDomain);
  }
  
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
})();
