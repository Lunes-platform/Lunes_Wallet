import React from "react";
// import i18n from "../../../../utils/i18n";
import PropTypes from "prop-types";

// MATERIAL
import { Grid } from "@material-ui/core";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// COMPONENTS
import Instructions from "../../../components/instructions";

// STYLES
import style from "../style.css";


class History extends React.Component {


    render() {
        return (
            <Grid container justify="center" >
                <Grid container className={style.boxHistoryTED} >
                    <Grid item xs={12} className={style.contentBoxHistory}>
                        <Grid item xs={12} className={style.infoHistory_NameUser}>
                            {"Damião Vieira dos Santos"}
                        </Grid>

                        <Grid item xs={12} style={{ display: "flex" }}>
                            <Grid item xs={3} className={style.infoHistoryDetails_FontLess}>
                                {"23/12/2018"}
                                {" "}
                                {"17:30"}
                            </Grid>

                            <Grid item xs={3} className={style.infoHistoryDetails_status}>
                                {"Confirmed"}
                            </Grid>

                            <Grid item xs={3} />

                            <Grid item xs={3} style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                                <img src="../images/icons/coins/lunes.png" width="14px" />
                                <p>{" Moeda "}</p>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} style={{ display: "flex" }}
                            className={style.infoHistoryDetails_FontMiddle}>
                            <Grid item xs={9}>
                                {"Caixa Economica - 1010 013 32545-6"}
                            </Grid>

                            <Grid item xs={3} style={{ textAlign: "right" }}>
                                <strong>
                                    {"1515.15151515"}
                                </strong>
                                <br />
                                {"R$ 15.00"}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}
                    className={style.transparentBox}
                    style={{ marginTop: "10px" }}
                >
                    <Instructions>
                        {/* TODO: set the modal content */}
                        <p>Conteúdo</p>
                    </Instructions>
                </Grid>
            </Grid>
        );
    }
}

History.propTypes = {
    classes: PropTypes.object,
    loading: PropTypes.bool.isRequired,
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(dispatch);

export default connect(
    mapDispatchToProps
)(History);  
