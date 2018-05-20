import React, { Component } from "react";
import GraphShell from "../../hoc/GraphShell/GraphShell";
import GraphProgressbar from "../../components/GraphProgressbar/GraphProgressbar";
import { connect } from "react-redux";
import type Graph from "../../store/models/Graph";
import "./GraphDashboard.css";

// type Props = {
//   graphs: Graph[];
// }

class GraphDashboard extends Component {
  render() {
    return (
      <div className="GraphDashboard">
        {this.props.graphs.map((g: Graph) => {
          return (
            <div className="tile" key={g.title}>
              <GraphShell
                value={g.value}
                maxValue={g.maxValue}
                color={g.startColor}
                title={g.title}
              >
                <GraphProgressbar
                  value={g.value}
                  maxValue={g.maxValue}
                  startColor={g.startColor}
                  endColor={g.endColor}
                />
              </GraphShell>
            </div>
          );
        })}
      </div>
    );
  }
}

GraphDashboard.propTypes = {};
GraphDashboard.defaultProps = {};

const mapStateToProps = state => {
  return {
    graphs: state.graphs.results,
    regions: state.form.regions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChangeGraphs: () => {}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GraphDashboard);
