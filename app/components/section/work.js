'use strict';

const React = require('react');
const PropTypes = React.PropTypes;

const config = require('../../config');
const ResumePropTypes = require('../../prop_types/resume');
const BulletPoints = require('../bullet_points');
const Datetime = require('../../utils/datetime');

const Entry = React.createClass({
    propTypes: {
        index: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
        entry: ResumePropTypes.work
    },

    render: function () {
        const startDate = Datetime.getDisplayFromDate(this.props.entry.startDate);
        const endDate = Datetime.getDisplayFromDate(this.props.entry.endDate);
        const index = this.props.index + 1;
        const divider = index === this.props.total ? (<br/>) : (<hr/>);

        return (
            <div className='row item'>
                <div className='twelve columns'>
                    <div className='two columns logo'>
                        <img src={config.logo[this.props.entry.company]} alt={this.props.entry.company}/>
                    </div>
                    <div className='ten columns content'>
                        <h3>{this.props.entry.company}</h3>
                        <p className='info'>
                            {this.props.entry.position}
                            &nbsp;&bull;&nbsp;
                            <em className='date'>{startDate} - {endDate}</em>
                        </p>
                        <BulletPoints points={this.props.entry.highlights}/>
                    </div>
                </div>
                {divider}
            </div>
        );
    }
});

const Work = React.createClass({
    propTypes: {
        content: ResumePropTypes.work_set
    },

    render: function () {
        const num_entries = this.props.content.length;
        return (
            <section id='work'>
                <div className='row work'>
                    <div className='two columns header-col'>
                        <h1>
                            <span>Work</span>
                        </h1>
                    </div>
                    <div className='ten columns main-col'>
                        {this.props.content.map(function (entry, index) {
                            return (
                                <Entry key={index} index={index} total={num_entries} entry={entry}/>
                            );
                        })}
                    </div>
                </div>
            </section>
        );
    }
});

module.exports = Work;
