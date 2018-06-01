import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  GET_ME_DEALS,
  SET_SELECTED_DEAL,
  UNSET_SELECTED_DEAL
} from "../../store/reducers/deals";
import backBtn from "../../assets/go-back.svg";
import xIcon from "../../assets/x.svg";
import styled from "styled-components";
import Infinite from "react-infinite";
import "./Deal.css";
import Detail from "../../components/Detail/Detail";
import humanize from "humanize-string";
import View from "../../components/View/View";
import classNames from "classnames";

const TableHead = [
  { title: "Record id", key: "recordId", width: 150 },
  { title: "Buyer", key: "buyer", width: 150 },
  { title: "Description", key: "description" },
  { title: "Total OPEX Savings 2018", key: "opexSavings", width: 80 },
  { title: "Total CAPEX Savings 2018", key: "capexSavings", width: 80 },
  { title: "Total OPEX Benefits 2018", key: "opexBenefits", width: 80 },
  { title: "Total CAPEX Benefits 2018", key: "capexBenefits", width: 80 }
];

const styles = {
  sidebar: {
    position: "absolute",
    right: 0,
    top: 0,
    width: "30%",
    height: "100%",
    backgroundColor: "#ffffff",
    boxShadow: "-8px 0 16px 0 rgba(0, 0, 0, 0.08)",
    padding: 20,
    boxSizing: "border-box",
    overflow: "auto"
  },
  container: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    height: "100%"
  },
  top: {
    flex: "none",
    height: 64,
    display: "flex",
    alignItems: "center"
  },
  content: {
    flex: 1
  },
  backBtn: {
    flex: "none"
  },
  title: {
    flex: 1,
    textAlign: "center"
  }
};

const StyledLink = styled(Link)`
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

class Deal extends Component {
  constructor() {
    super();
    this.tableBodyRef = React.createRef();
  }

  componentDidMount() {
    const { location, getDeals } = this.props;
    getDeals(location.pathname);
  }

  render() {
    const {
      location,
      dealsData,
      setDeal,
      unsetDeal,
      selectedDeal
    } = this.props;

    const headerWidth = this.tableBodyRef.current
      ? this.tableBodyRef.current.querySelector(".infinite-deals > div")
          .clientWidth
      : "100%";

    return (
      <div style={styles.container}>
        <div style={styles.top} className="top">
          <div style={styles.backBtn} className="backBtn">
            <StyledLink to="/">
              <div
                style={{
                  color: "#d1dae8",
                  fontWeight: 600,
                  fontSize: 14
                }}
              >
                <img
                  style={{ margin: "0 12px 0 16px" }}
                  src={backBtn}
                  alt="<"
                />{" "}
                Back
              </div>
            </StyledLink>
          </div>
          <div style={styles.title} className="title">
            {location.state.title}
          </div>
        </div>
        <div style={styles.content} className="content">
          <div
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <div
              className="table-header-wrap"
              style={{
                backgroundColor: "#f8fafd",
                display: "flex",
                width: headerWidth
              }}
            >
              {TableHead.map(h => (
                <div
                  style={{
                    fontSize: 12,
                    textAlign: "left",
                    color: "#424242",
                    fontWeight: "normal",
                    padding: 10,
                    ...(h.width ? { width: h.width } : null),
                    ...(!h.width ? { flex: 1 } : null)
                  }}
                  key={h.title}
                >
                  {h.title}
                </div>
              ))}
            </div>
            <div
              className="table-body"
              ref={this.tableBodyRef}
              style={{ flex: 1 }}
            >
              <Infinite
                className="infinite-deals"
                containerHeight={
                  this.tableBodyRef.current &&
                  this.tableBodyRef.current.clientHeight
                    ? this.tableBodyRef.current.clientHeight
                    : 500
                }
                elementHeight={60}
              >
                {dealsData.map((d, i) => (
                  <div
                    className={classNames(
                      "one-deal",
                      selectedDeal === d ? "selected" : ""
                    )}
                    style={{
                      display: "flex",
                      height: 60,
                      overflow: "hidden",
                      cursor: "pointer"
                    }}
                    onClick={() => setDeal(d)}
                    key={i}
                  >
                    {TableHead.map(h => (
                      <div
                        style={{
                          fontSize: 14,
                          color: "#424242",
                          fontWeight: "normal",
                          padding: 10,
                          ...(h.width ? { width: h.width } : null),
                          ...(!h.width ? { flex: 1 } : null)
                        }}
                        key={h.title}
                      >
                        {d[h.key]}
                      </div>
                    ))}
                  </div>
                ))}
              </Infinite>
            </div>
          </div>
        </div>
        {selectedDeal ? (
          <div style={styles.sidebar} className="sidebar">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: "#424242"
                }}
              >
                Details
              </div>
              <div onClick={unsetDeal} style={{ cursor: "pointer" }}>
                <img src={xIcon} alt="x" />
              </div>
            </div>
            {selectedDeal
              ? Object.keys(selectedDeal).map((k, i) => (
                  <View key={i} style={{ margin: "30px 0" }}>
                    <Detail title={humanize(k)} description={selectedDeal[k]} />
                  </View>
                ))
              : null}
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dealsData: state.deals.data,
  selectedDeal: state.deals.selectedDeal
});

const mapDispatchToProps = dispatch => ({
  getDeals: name => dispatch({ type: GET_ME_DEALS, payload: { name } }),
  setDeal: deal => dispatch({ type: SET_SELECTED_DEAL, payload: { deal } }),
  unsetDeal: () => dispatch({ type: UNSET_SELECTED_DEAL })
});

export default connect(mapStateToProps, mapDispatchToProps)(Deal);
