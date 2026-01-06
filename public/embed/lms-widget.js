(function () {
  window.ElevateLMS = {
    embed: function (id, opts = {}) {
      var c = document.getElementById(id);
      if (!c) return;
      var iframe = document.createElement('iframe');
      iframe.src =
        'https://app.elevateforhumanity.institute' + (opts.route || '/lms');
      iframe.style.cssText =
        'width:100%;height:' +
        (opts.height || '800px') +
        ';border:none;border-radius:8px';
      c.appendChild(iframe);
    },
    openCourses: function () {
      window.open('https://app.elevateforhumanity.institute/lms/courses', '_blank');
    },
    openDashboard: function () {
      window.open('https://app.elevateforhumanity.institute/lms/dashboard', '_blank');
    },
  };
})();
