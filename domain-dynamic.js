(function() {
  var currentDomain = window.location.protocol + '//' + window.location.host;
  var currentPath = window.location.pathname;
  
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
    ogImage.content = ogImage.content.replace(/https:\/\/www\.(khelo24info|kheloo24)\.live/, currentDomain);
  }
  
  // Update manifest
  var manifest = document.querySelector('link[rel="manifest"]');
  if (manifest && manifest.href.includes('khelo24info.live')) {
    manifest.href = manifest.href.replace(/https:\/\/www\.(khelo24info|kheloo24)\.live/, currentDomain);
  }
  
  // Update apple-touch-icon
  var appleIcon = document.querySelector('link[rel="apple-touch-icon"]');
  if (appleIcon && appleIcon.href.includes('khelo24info.live')) {
    appleIcon.href = appleIcon.href.replace(/https:\/\/www\.(khelo24info|kheloo24)\.live/, currentDomain);
  }
  
  // Update favicon
  var favicon = document.querySelector('link[rel="icon"]');
  if (favicon && favicon.href.includes('khelo24info.live')) {
    favicon.href = favicon.href.replace(/https:\/\/www\.(khelo24info|kheloo24)\.live/, currentDomain);
  }
  
  // Update JSON-LD schema
  var scripts = document.querySelectorAll('script[type="application/ld+json"]');
  scripts.forEach(function(script) {
    try {
      var data = JSON.parse(script.textContent);
      var updated = JSON.stringify(data).replace(/https:\/\/www\.(khelo24info|kheloo24)\.live/g, currentDomain);
      script.textContent = updated;
    } catch(e) {}
  });
})();
