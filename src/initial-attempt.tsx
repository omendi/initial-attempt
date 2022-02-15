/*!
 * Copyright 2020, Staffbase GmbH and contributors.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { ReactElement } from "react";
import { BlockAttributes } from "widget-sdk";

/**
 * React Component
 */
export interface InitialAttemptProps extends BlockAttributes {
  anniversaryprofilefieldid: string;
  dateformat: string;
  includepending: boolean;
  noinstancesmessage: string;
  title: string;
  todaytitle: string;
  yearword: string;
  yearwordplural: string;
  showdate: boolean;
  showwholemonth: boolean;
  showwholemonthforxdays: number;
  showdaysbefore: number;
  showdaysafter: number;
  specialyears: string;
  linktochat: boolean;
  limit: number;
  imageurl: string;
  headercolor: string;
  additionalfieldsdisplayed: string;
  optoutgroupid: string;
  includeyear: boolean;
  daysbeforetitle: string;
  daysaftertitle: string;
  groupid: string;
  networkid: string;
  numbertoshow: number;
}


export const InitialAttempt = ({ dateformat, anniversaryprofilefieldid, includepending, numbertoshow, noinstancesmessage, title, todaytitle, yearword, yearwordplural, showdate, showwholemonth, groupid, showwholemonthforxdays, imageurl, showdaysbefore, showdaysafter, splitbyyear, specialyears, linktochat, limit, headercolor, additionalfieldsdisplayed, optoutgroupid, includeyear, daysbeforetitle, daysaftertitle, networkid }: InitialAttemptProps): ReactElement => {

  const compareDates = (dateOne: string, dateTwo: string, dateformat = 'DD.MM') => {

    // If the widget is in anniversary mode, the year is taken into consideration when comparing, otherwise only the month and date are compared.
    const dateA = new Date (0, parseInt(dateOne.substring((dateformat === "DD.MM" ? 3 : 0),(dateformat === "DD.MM" ? 5 : 2)))-1, parseInt(dateOne.substring((dateformat === "DD.MM" ? 0 : 3),(dateformat === "DD.MM" ? 2 : 5))));
    const dateB = new Date (0, parseInt(dateTwo.substring((dateformat === "DD.MM" ? 3 : 0),(dateformat === "DD.MM" ? 5 : 2)))-1, parseInt(dateTwo.substring((dateformat === "DD.MM" ? 0 : 3),(dateformat === "DD.MM" ? 2 : 5))));

    return {
      sameDate: dateA.getTime() === dateB.getTime(),
      sameMonth: dateA.getMonth() === dateB.getMonth(),
      daysDiff: Math.ceil((dateA.getTime() - dateB.getTime()) / (1000 * 60 * 60 * 24))
    }
  }

  const convertDate = (date: string, dateformat = 'DD.MM') => {

    const dateVal = new Date (0, parseInt(date.substring((dateformat === "DD.MM" ? 3 : 0),(dateformat === "DD.MM" ? 5 : 2)))-1, parseInt(date.substring((dateformat === "DD.MM" ? 0 : 3),(dateformat === "DD.MM" ? 2 : 5))));

    return dateVal.toLocaleString('default', { month: 'long', day: 'numeric' });
  }

  let usersByGroupCondition = {},
    anniversariesCount = 0;
  const dateNow = new Date().toLocaleDateString(dateformat == 'DD.MM' ? 'de-DE' : 'en-US', { year:'numeric', month: '2-digit', day: '2-digit' }),
    daysSinceBeginningOfMonth = compareDates(dateNow, dateformat == 'DD.MM' ? '01' + dateNow.substring(2) : dateNow.substring(0,3) + '01' , dateformat).daysDiff;

  const imgstyles: { [key: string]: React.CSSProperties } = {
    container: {
      width: '55px',
      height: '55px',
      verticalAlign: 'top',
      borderRadius: '5px',
      marginRight: '15px'
    },
  };

  const spanstyles: { [key: string]: React.CSSProperties } = {
    container: {
      width: '55px',
      height: '55px',
      backgroundColor: we.authMgr.getBranch().colors.backgroundColor,
      fontSize: '26px',
      lineHeight: '55px',
      color: '#ffffff',
      textAlign: 'center',
      verticalAlign: 'top',
      borderRadius: '5px',
      marginRight: '15px',
      display: 'inline-block'
    },
  };

  const h2styles: { [key: string]: React.CSSProperties } = {
    container: {
      color: '#' + (headercolor ? headercolor : '000000')
    },
  };

  const divstyles: { [key: string]: React.CSSProperties } = {
    container: {
      borderRadius: '10px',
      border: '1px solid #D3D3D3',
      padding: '8px',
      margin: '10px 0px'
    },
  };

  const pstyles: { [key: string]: React.CSSProperties } = {
    container: {
      display: 'inline-block',
      marginTop: '0',
      color: '#000000'
    },
  };

  const hrstyles: { [key: string]: React.CSSProperties } = {
    container: {
      margin: '0'
    },
  };

  const namestyles: { [key: string]: React.CSSProperties } = {
    container: {
      fontSize: '16px'
    },
  };

  const datestyles: { [key: string]: React.CSSProperties } = {
    container: {
      fontSize: '12px'
    },
  };


  const [usersList, setUsers] = React.useState([{}]);
  const [networkID, setNID] = React.useState(String);


  React.useEffect(() => {


    if(includepending === 'true') {

      const getNetworkUsers = async (limit: number, offset:number, users:Array<Object>) => {
        const loadedUsers  = await we.api.call("installations/" + networkid + "/users", {'limit': limit, 'offset': offset}, {type: 'GET'});
        users = users.concat(loadedUsers.data);
        if(loadedUsers.total < limit + offset){
          setUsers(users);
        } else {
          await getNetworkUsers(limit, limit+offset, users);
        }
      }
      getNetworkUsers(1000, 0, []).catch(console.error);

    } else {
      const getAllUsers = async (limit: number, offset:number, users:Array<Object>) => {
        const loadedUsers  = await we.api.getUsers({'status': 'activated', 'limit': limit, 'offset': offset});
        users = users.concat(loadedUsers.data);
        if(loadedUsers.total < limit + offset){
          setUsers(users);
        } else {
          await getAllUsers(limit, limit+offset, users);
        }
      };
  
      getAllUsers(1000,0,[]).catch(console.error);

    }

  }, [networkID]);


  const filteredUsers = usersList.filter(user => {
    if (groupid !== undefined && (!user.groupIDs || (user.groupIDs && !user.groupIDs.includes(groupid)))) return false;
    if (user.groupIDs && (optoutgroupid !== undefined && optoutgroupid !== "") && (user.groupIDs.some(id => optoutgroupid.split(",").includes(id)))) return false;
    if (!user.profile || typeof(user.profile[anniversaryprofilefieldid]) === 'undefined') return false;
    if (user.profile[anniversaryprofilefieldid] == '' || user.profile[anniversaryprofilefieldid] == null) return false;
    const dateComparison = compareDates(user.profile[anniversaryprofilefieldid], dateNow, dateformat);
    if (showwholemonth === 'true') return dateComparison.sameMonth && daysSinceBeginningOfMonth >= 0;
    return dateComparison.sameDate || 
              (dateComparison.daysDiff >= (- showdaysbefore) && dateComparison.daysDiff < 0) || 
              (dateComparison.daysDiff <= showdaysafter && dateComparison.daysDiff > 0);
  });
  filteredUsers.sort((userA,userB) => {
    return compareDates(userA.profile[anniversaryprofilefieldid], userB.profile[anniversaryprofilefieldid], dateformat).daysDiff;
  });



  let htmlList = [];
  if (filteredUsers.length > 0){
    if (includeyear === 'true') {
      usersByGroupCondition = filteredUsers.reduce((arr: {},user) => {
        let yearCount = parseInt(dateNow.substr(6,4)) - user.profile[anniversaryprofilefieldid].substr(6,4);
        yearCount = yearCount > 120 ? yearCount - (parseInt(dateNow.substr(6,2))-1)*100 : yearCount;
        arr[yearCount] = arr[yearCount] || [];
        arr[yearCount].push(user);
        return arr;
      },{});

      if(specialyears !== undefined) {
        const specialyearsarr = specialyears.split(',');
        usersByGroupCondition = Object.keys(usersByGroupCondition).filter(yearCount => specialyearsarr.includes(yearCount)).reduce((obj, key) => {
          obj[key] = usersByGroupCondition[key];
          return obj;
        }, {});
      }
    } else {
      usersByGroupCondition = filteredUsers.reduce((arr,user) => {
        const dateComparison = compareDates(user.profile[anniversaryprofilefieldid], dateNow, dateformat),
            dateGroup = dateComparison.sameDate ? '0-today' : dateComparison.daysDiff < 0 ? '2-previous' : '1-upcoming';
        arr[dateGroup] = arr[dateGroup] || [];
        arr[dateGroup].push(user);
        return arr;
      }, {});
      usersByGroupCondition = Object.keys(usersByGroupCondition).sort().reduce((obj, key) => { 
        obj[key] = usersByGroupCondition[key]; 
        return obj;
      },{});
    }

    for (const [groupCondition, usersGroup] of Object.entries(usersByGroupCondition)) {
      if (limit !== undefined) if (anniversariesCount >= limit) return;
      if (includeyear === 'true' || daysaftertitle !== undefined || daysbeforetitle !== undefined) {
        htmlList.push(<h2 key={groupCondition} style={hrstyles.container} className="cw-group-condition-title">{groupCondition === '0-today' ? todaytitle : (groupCondition === '1-upcoming' ? daysaftertitle : (groupCondition === '2-previous' ? daysbeforetitle : (groupCondition + " " + (parseInt(groupCondition) > 1 ? yearwordplural : yearword) )))}</h2>)
      }
      htmlList.push(usersGroup.map(
        theUser => {
          const hasAvatar = (typeof(theUser.avatar) !== 'undefined' || imageurl !== undefined),
              userLink = we.authMgr.getBranchConfig().whitelabelConfig.frontendURL + "/profile/" + theUser.id;
          return <div key={theUser.id + 'divInner'} id={theUser.id} className="cw-entries" style={divstyles.container}>
                    <a key={theUser.id + 'a'} href={userLink} className="link-internal ally-focus-within">
                      {hasAvatar ? <img key={theUser.id + 'img'} data-type="thumb" data-size="35" aria-hidden="true" data-user-id={theUser.id} style={imgstyles.container} src={theUser.avatar ? (theUser.avatar.thumb ? theUser.avatar.thumb.url : imageurl) : imageurl} alt={theUser.firstName + " " + theUser.lastName}></img> :
                        <span key={theUser.id + 'span'} data-type="thumb" data-size="35" aria-hidden="true" data-user-id={theUser.id} style={spanstyles.container}>{theUser.firstName.substr(0,1) + theUser.lastName.substr(0,1)}</span>}
                      <div style={pstyles.container}><div style={namestyles.container}>{theUser.firstName} {theUser.lastName}</div><hr style={hrstyles.container}></hr><span style={datestyles.container}>{showdate === 'true' ? (theUser.profile ? convertDate(theUser.profile[anniversaryprofilefieldid]) : '') : ''}</span></div>
                      </a>
                  </div>
    
        }))
      anniversariesCount = anniversariesCount + usersGroup.length;
    }
  } else {
    htmlList.push(<p key="cw-noinstances">{noinstancesmessage}</p>)
  }

  const contentstyles: { [key: string]: React.CSSProperties } = {
    container: {
      // 83 * number to show
      height: ((numbertoshow !== undefined && numbertoshow !== "" && numbertoshow < filteredUsers.length) ? (83 * numbertoshow) + 'px' : (filteredUsers.length * 83 + 10) + 'px'),
      overflow: 'auto',
    },
  };

  const outerstyles: { [key: string]: React.CSSProperties } = {
    container: {
      // (83 * number to show) + 50
      height: ((numbertoshow !== undefined && numbertoshow !== "") ? (83 * numbertoshow + 50) + 'px' : (filteredUsers.length * 83 + 50) + 'px'),
      padding: '3px',
    },
  };

  return (
    <div id={"cw-" + anniversaryprofilefieldid} style={outerstyles.container}>
      <h1 id='cw-title' style={h2styles.container}>{title}</h1>
      <div id='cw-list-container' key="userList" style={contentstyles.container}>{htmlList}</div>
    </div>
  );

    
};
//<img key={theUser.id + 'img'} data-type="thumb" data-size="35" aria-hidden="true" data-user-id={theUser.id} style={styles.container} src={theUser.avatar?.thumb?.url} alt={theUser.firstName + " " + theUser.lastName}></img> {theUser.firstName} - {theUser.lastName} - {theUser.profile ? theUser.profile[anniversaryprofilefieldid]?.substring(0,5) : ''}