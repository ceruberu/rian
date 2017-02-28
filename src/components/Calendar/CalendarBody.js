import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3'
import { Calendar } from 'calendar';
import CalendarPostModal from './CalendarPostModal';
import moment from 'moment';

const duration = 1500;
const days = ['Sun','Mon','Tue','Wed','Thu','Fri',"Sat"]
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']


export default class CalendarBody extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    const {_userId, username} = this.props.User;
  	const {data, day, locale, month, type, year, currentDay, currentMonth, currentYear} = this.props.Calendar;
    var initialTime = {
      locale: locale,
      currentDate: moment().format('l').split('/').map(function(item){
        return parseInt(item);
      })
    }
    var weeks = this.renderTime(year, month);
    const table = d3.select('#calendar-body');
    const header = table.append('thead');
    const body = table.append('tbody');
    this.renderTableHeader(table,header,body, duration)
    this.renderTable(table, header, body, duration, weeks, month, year, currentDay, currentMonth, currentYear);
    if(this.props.User._id !== null){
        this.props.calendarRequest({_userId},{month,year});
    }
    if(this.props.Calendar.selectedDay !== null){
        this.selectDate(this.props.Calendar.selectedDay)
        debugger
    }
    debugger
  }

  componentWillReceiveProps(nextProps){
    let next = nextProps.Calendar;
    let nextWeeks = this.renderTime(next.year,next.month);
    if(nextProps.Calendar.month !== this.props.Calendar.month){
      const table = d3.select('#calendar-body');
      table.select('tbody').remove();
      const header = table.select('thead')
      const body = table.append('tbody');
      this.renderTable(table, header, body, duration, nextWeeks, next.month, next.year );
    }
  }

  displayToday(day){
    d3.select(`#id${day}`)
      .classed('today', true);
  }

  selectDate(day){

    d3.select('.active')
      .classed('active', false)
    d3.select(`#id${day}`)
      .classed('active', true);

    var date = {
      month: this.props.Calendar.month,
      year: this.props.Calendar.year
    }

    if(day[0] === 'n'){
      if(date.month !== 12){
        date.month++;
      } else {
        date.month = 1;
        date.year++;
      }
      date.day= day.slice(1)
    } else if(day[0] === 'l'){
      if(date.month !== 1){
        date.month--;
      } else {
        date.month = 12;
        date.year--
      }
      date.day= day.slice(1);
    } else {
      date.day = day;
    }

    this.props.calendarSelectDate(date);
  }

  renderData(data){
    d3.select(`#id${data.day}`)
      .append('div')
      .text(`${data.title}`)
  }

  renderTime(year, month) {
    const cal = new Calendar(0);
    var weeks = cal.monthDays(year, month-1); //[0,0,0,1,2,3,4], ....
        // var weeks = cal.monthDays(2017,1); // 2017,1** = 2017 Feb

    if(weeks[0][0] === 0){
    	var lastYear = year;
    	var lastMonth = month;
    	if(lastMonth === 1){
    		lastMonth = 12;
    		lastYear--;
    	} else {
        lastMonth--;
      }
    	var lastWeek = cal.monthDays(lastYear, lastMonth-1);
    	weeks[0] = weeks[0].map((day,i)=>{
    		if(day === 0){
    			return "l" + lastWeek[lastWeek.length-1][i];
    		} else {
    			return day
    		}
    	})
    }
    if(weeks[weeks.length-1][6] === 0){
    	var nextYear = year;
    	var nextMonth = month;
    	if(nextMonth === 12){
    		nextMonth = 1
    		nextYear++;
    	} else {
        nextMonth++
      }

    	var nextWeek = cal.monthDays(nextYear, nextMonth-1);

    	weeks[weeks.length-1] = weeks[weeks.length-1].map((day,i)=>{
    		if(day === 0){
    			return "n" + nextWeek[0][i]
    		} else {
    			return day
    		}
    	})
    }
    return weeks;
  }

  renderTableHeader(table, header, body, duration){
    header
      .append('tr')
      .selectAll('td')
      .data(days)
      .enter()
      .append('td')
      .text((d)=> d)
      .style('text-align', 'center')
      .style('opacity',0)
    .transition()
      .duration(duration)
      .style("opacity",1)
  }


  renderTable(table, header, body, duration, weeks, month, year, currentDay, currentMonth, currentYear) {
    let that = this;

    weeks.forEach(function(week){
      body
        .append('tr')
        .selectAll('td')
        .data(week)
        .enter()
        .append('td')
        .attr('id', (d)=>{
          if(d !== 0){
            return 'id'+ d
          }
        })
        .classed('holiday', (d,i)=>{
          if(i === 0 || i === 6){
            return true
          }
        })
        .classed('unactive',(d)=>{
          if (d[0] === 'l' || d[0] === 'n'){
            return true
          } 
        })
        // .on('mouseover', (d,i)=>that.handleMouseOver(d,i))
        // .on('mouseout', (d,i)=>that.handleMouseOut(d,i))
        .on('click', (d,i)=>that.selectDate(d,i))
        .text((d)=>{
          if (d[0] === 'l' || d[0] === 'n'){
            return d.slice(1);
          } else {
            return d
          }
        })
        .style("opacity",0)
      .transition()
        .duration(duration)
        .style("opacity",1)
 
    })

    if(currentYear === year && currentMonth === month){
      this.displayToday(currentDay);
    }


  }

  handleButtonClick(){
    const {year, month, day } = this.props.Calendar;
    const {username} = this.props.User;
    const _userId = this.props.User._id;
    this.props.calendarPost(
      {
        _userId, username,year,month,day,
        type:"once", 
        title: "New Event"
      }
    )
  }


  render() {
    return (
      <div>
        <button onClick={()=>this.handleButtonClick()}/>
        <CalendarPostModal
          User={this.props.User}
          Calendar={this.props.Calendar}
        />
        <table id="calendar-body">
        </table>
      </div>
    );
  }
}
