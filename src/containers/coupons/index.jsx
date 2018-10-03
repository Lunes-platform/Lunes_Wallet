import React from "react";

// COMPONENTS
import Cupom from "./cupom";
// import LunesGift from './lunesGift';
import Tabs from "../../components/tabs";
import Voucher from "./voucher";

// UTILS
import i18n from "../../utils/i18n";

const titles = [
  i18n.t("COUPON_TITLE_1"),
  // i18n.t("COUPON_TITLE_2"),
  i18n.t("COUPON_TITLE_3")
];

const contents = [
  <Voucher key="1" />,
  // <LunesGift />,
  <Cupom key="2" />
];

class Recharge extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Tabs tabTitles={titles} tabContents={contents} justify="center" />
      </div>
    );
  }
}

export default Recharge;
