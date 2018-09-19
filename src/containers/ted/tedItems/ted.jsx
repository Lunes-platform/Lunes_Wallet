import React from "react";
import i18n from "../../../utils/i18n";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// COMPONENTS
import Select from "../../../components/select";
import Instructions from "../../../components/instructions";
import colors from "../../../components/bases/colors";
import Loading from "../../../components/loading";
import { CpfMask, MoneyBrlMask } from "../../../components/inputMask";

// MATERIAL
import { Grid, Input } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

// STYLES
import style from "../style.css";

const customStyle = {
    inputRoot: {
        color: colors.messages.info,
        margin: "0.5rem 0",
        padding: "5px",
        width: "calc(100% - 20px)",
        "&:hover:before": {
            borderBottomColor: colors.purple.dark
        }
    },
    inputCss: {
        color: colors.messages.info,
        fontFamily: "Noto Sans, sans-serif",
        fontSize: "14px",
        letterSpacing: "0.5px",
        textAlign: "left",
        "&::placeholder": {
            fontSize: "1.2vh",
            opacity: "1"
        }
    },
    inputCssCenter: {
        fontFamily: "Noto Sans, sans-serif",
        fontSize: "16px",
        letterSpacing: "0.5px",
        textAlign: "center"
    },
    inputCssUnderline: {
        "&:before, &:after": {
            borderBottomColor: colors.purple.dark
        },
        "&:hover:not($disabled):not($error):not($focused):before": {
            borderBottomColor: `${colors.purple.dark} !important`
        }
    },
    inputCssUnderlineDisabled: {
        "&:before, &:after": {
            display: "none"
        }
    },
    disabled: {},
    error: {},
    focused: {}
};

class Ted extends React.Component {
    constructor() {
        super();
        this.state = {
            errors: [],
            coin: {
                name: undefined,
            }
        };
        this.coinSelected = this.coinSelected.bind(this);
    }

    coinSelected = ( title = undefined) => {
        this.setState({
            ...this.state,
            coin: {
                name: title,
            },
        });
    };

    render() {
        const { classes, loading, coinsRedux } = this.props;
        const { coin, errors } = this.state;

        const title = coin.name || "Select a coin..";

        return (
            <Grid container justify="center" >
                <Grid container className={style.box}>
                    <Grid item xs={6}>
                        <Select
                            list={coinsRedux}
                            title={"BANCO / INSTITUIÇÃO"}
                            selectItem={this.coinSelected}
                            style={{ backgroundColor: "black !important" }}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <Select
                            list={coinsRedux}
                            title={"TIPO DE CONTA"}
                            selectItem={this.coinSelected}
                        />
                    </Grid>

                    <Grid item xs={12} style={{ display: "flex" }}>
                        <Grid item xs={3}>
                            <Input
                                classes={{
                                    root: classes.inputRoot,
                                    underline: classes.inputCssUnderline,
                                    input: classes.inputCss
                                }}
                                placeholder="AGENCIA"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Input
                                classes={{
                                    root: classes.inputRoot,
                                    underline: classes.inputCssUnderline,
                                    input: classes.inputCss
                                }}
                                placeholder="OPERAÇÃO"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Input
                                classes={{
                                    root: classes.inputRoot,
                                    underline: classes.inputCssUnderline,
                                    input: classes.inputCss
                                }}
                                placeholder="CONTA"
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Input
                            classes={{
                                root: classes.inputRoot,
                                underline: classes.inputCssUnderline,
                                input: classes.inputCss
                            }}
                            placeholder="NOME OU RAZÃO SOCIAL"
                        />
                    </Grid>

                    <Grid item xs={12} style={{ display: "flex" }}>
                        <Grid item xs={6} >
                            <Input
                                classes={{
                                    root: classes.inputRoot,
                                    underline: classes.inputCssUnderline,
                                    input: classes.inputCss
                                }}
                                placeholder="CPF"
                                inputComponent={CpfMask}

                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Input
                                classes={{
                                    root: classes.inputRoot,
                                    underline: classes.inputCssUnderline,
                                    input: classes.inputCss
                                }}
                                placeholder="VALOR DO TED"
                                inputComponent={MoneyBrlMask}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} className={style.box} style={{ marginTop: "10px" }}>
                    <Grid container>
                        <Grid item xs={12} sm={6} >
                            <Select
                                list={coinsRedux}
                                title={title}
                                selectItem={this.coinSelected}
                                error={errors.includes("coin")}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} className={style.transparentBox}
                    style={{ marginTop: "10px" }}>

                    <Link to="#">
                        <button
                            className={style.buttonBorderGreen}
                            onClick={this.inputValidator}
                        >
                            {loading ? <Loading /> : i18n.t("PAYMENT_PAY_NOW")}
                        </button>
                    </Link>
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

Ted.propTypes = {
    classes: PropTypes.object,
    coinsRedux: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
};

const mapStateToProps = store => ({
    coinsRedux: store.payment.coins,
    payment: store.payment.payment,
    loading: store.payment.loading
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(customStyle)(Ted));
