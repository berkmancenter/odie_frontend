import config from './../config/general'

if (config.hotjar.account_id) {
  let script = document.createElement('script')
  script.text = `
    <!-- Hotjar Tracking Code -->
    (function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:${config.hotjar.account_id},hjsv:6};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
  `
  document.getElementsByTagName('body')[0].appendChild(script)
}
