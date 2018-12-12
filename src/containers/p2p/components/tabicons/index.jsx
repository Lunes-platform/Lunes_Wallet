import React from "react";
import PropTypes from "prop-types";

// STYLE
import style from "./style.css";

//REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setTabIcon } from "../../redux/p2pAction";

class TabIcons extends React.Component {
  constructor(props) {
    super(props);
  }

  handleIcon = key => {
    const { setTabIcon } = this.props;
    setTabIcon(key);
  };

  render() {
    const { content } = this.props;
    const { tabIcon } = this.props.p2pStore;

    return (
      <div className={style.baseTab}>
        {content.map((val, key) => {
          let open;
          let icon_img;
          if (key == tabIcon) {
            open = style.itemTabActive;
            icon_img = val;
          } else {
            open = style.itemTab;
            icon_img = val + "-purple";
          }

          return (
            <div
              key={key}
              onClick={() => this.handleIcon(key)}
              className={open}
            >
              <img src={`images/icons/p2p/${icon_img}.png`} />
            </div>
          );
        })}
      </div>
    );
  }
}

TabIcons.propTypes = {
  content: PropTypes.array.isRequired,
  handle: PropTypes.func.isRequired,
  p2pStore: PropTypes.object,
  setTabIcon: PropTypes.func
};

const mapStateToProps = store => ({
  p2pStore: store.p2p
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setTabIcon
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabIcons);
