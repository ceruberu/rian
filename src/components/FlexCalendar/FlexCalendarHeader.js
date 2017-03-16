import React, { Component, PropTypes } from 'react';
import { Button, Modal, Glyphicon } from 'react-bootstrap';
import FlexCalendarPostModal from './FlexCalendarPostModal';
import { Calendar as calen } from 'calendar'


export default class FlexCalendarHeader extends Component {
  constructor(props){
    super(props);
  }

  change(direction, date){
    if(this.props.Calendar.kind === 'month'){
      this.changeMonth(direction, date)
    } else {
      this.changeWeek(direction, date)
    }
  }

  changeWeek(direction, date){
    const { month, year, selectedDay, selectedWeek, selectedMonth, selectedYear } = this.props.Calendar;
    var nextWeek = selectedWeek, nextMonth = month, nextYear = year;
    let dateObj = { };
    var d = new Date(selectedYear,selectedMonth-1,selectedDay);

    if(direction === 'left'){
       d.setDate(d.getDate() - 7);
       dateObj.selectedDay = d.getDate();
       dateObj.selectedMonth = (d.getMonth()+1);
       dateObj.selectedYear = d.getFullYear();

      if(selectedWeek === 0){
        this.changeMonth('left', 'max', dateObj );
      } else {
        nextWeek--;
        dateObj.selectedWeek = nextWeek;
        this.props.calendarChangeWeek(dateObj);
      }
    } else if (direction === 'right'){
       d.setDate(d.getDate() + 7);
       dateObj.selectedDay = d.getDate();
       dateObj.selectedMonth = 1+(d.getMonth());
       console.log("MONTH!! ", dateObj.selectedMonth)
       dateObj.selectedYear = d.getFullYear();     
      if(selectedWeek === this.props.Calendar.maxWeeks-1 ){
        this.changeMonth('right', 'min', dateObj);
      } else {
        nextWeek++
        dateObj.selectedWeek = nextWeek;
        this.props.calendarChangeWeek(dateObj);
      }
    }
    
  }

  changeMonth(direction, week, weekDayObj){
    const { day, month, year, selectedWeek, selectedDay, selectedMonth, selectedYear } = this.props.Calendar;
    var nextDay = day, nextMonth = month, nextYear = year, nextSelectedDay = selectedDay, nextSelectedMonth = selectedMonth, nextSelectedYear = selectedYear;

    if(direction === 'left'){
      if(month === 1){
        nextYear--;
        nextMonth = 12
      } else {
        nextMonth--;
      }
    } else if (direction === 'right'){
      if(month === 12){
        nextYear++;
        nextMonth = 1
      } else {
        nextMonth++;
      }
    } 
    var nextMonthDays = new calen(0).monthDays(nextYear, nextMonth-1);
    var nextMonthJoin =  nextMonthDays
          .reduce((a,b)=>{
          return a.concat(b)
          })
    var nextMonthMax = Math.max(nextMonthJoin);
    if(selectedDay > nextMonthMax){
      nextSelectedDay = nextMonthMax
    }
    var nextSelectedWeek = Math.floor(nextMonthJoin.indexOf(nextSelectedDay)/7)

    let dateObj = {
      month : nextMonth,
      year : nextYear,
      maxWeeks : nextMonthDays.length,
      selectedDay : nextSelectedDay,
      selectedWeek : nextSelectedWeek,
      selectedMonth : nextMonth,
      selectedYear : nextYear
    }
    if(!week){
      this.props.calendarChangeMonth(dateObj);
    } else {
      if(week === 'max'){
        if(nextMonthDays[nextMonthDays.length-1][6] !== 0){
          dateObj.selectedWeek = nextMonthDays.length-3;
        } else {
          dateObj.selectedWeek = nextMonthDays.length-2;
        }
      } else if (week === 'min'){
        if(nextMonthDays[0][0] === 0){
          dateObj.selectedWeek = 1;
        } else {
          dateObj.selectedWeek = 0;
        }
      }
      dateObj.selectedDay = weekDayObj.selectedDay;
      dateObj.selectedMonth = weekDayObj.selectedMonth;
      dateObj.selectedYear = weekDayObj.selectedYear;
      this.props.calendarChangeMonth(dateObj);
    }
  }

  render() {
  	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return (
      <div id="FlexCalendarHeader">
        <div id="DateControl">
	        <Button type="button" className="btn btn-default" onClick={()=>this.change('left')}>
	          <Glyphicon glyph="menu-left" />
	        </Button>      
	         <span>{months[this.props.Calendar.month-1]} {this.props.Calendar.year}</span>
	        <Button type="button" className="btn btn-default" onClick={()=>this.change('right')}>
	          <Glyphicon glyph="menu-right" />
	        </Button> 
	    </div>
	    <div id="CalendarButtons">
	        <FlexCalendarPostModal
	          User={this.props.User}
	          Calendar={this.props.Calendar}
	          calendarPost={(form)=>this.props.calendarPost(form)}
	        />
          <Button
            onClick={this.props.calendarToggle}
          >
          {this.props.Calendar.kind}
          </Button>
        </div>
      </div>
    );
  }
}
