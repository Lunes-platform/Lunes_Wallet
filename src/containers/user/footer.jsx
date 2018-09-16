import React from "react";
import i18n from "../../utils/i18n";
// import { Link } from "react-router-dom";

// STYLE
import style from "./style.css";

class Footer extends React.Component {
  render() {
    return (
      <div className={style.footer}>
        <a href="mailto:support@lunes.io" className={style.footerLink}>
          {i18n.t("LOGIN_FOOTER_SUPPORT")}
        </a>
        {/* <span className={style.footerSpace}>|</span>
        <Link to="#" className={style.footerLink}>
          i18n.t("LOGIN_FOOTER_LANG")}
          </Link> */}
        <p>&copy; {i18n.t("LOGIN_FOOTER")}</p>
      </div>
    );
  }
}
export default Footer;
