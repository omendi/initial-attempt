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
  splitbyyear: boolean;
  specialyears: string;
  linktochat: boolean;
  limit: number;
  headercolor: string;
  additionalfieldsdisplayed: string;
  optoutgroupid: string;
}


export const InitialAttempt = ({ dateformat, anniversaryprofilefieldid, includepending, noinstancesmessage, title, todaytitle, yearword, yearwordplural, showdate, showwholemonth, showwholemonthforxdays, showdaysbefore, showdaysafter, splitbyyear, specialyears, linktochat, limit, headercolor, additionalfieldsdisplayed, optoutgroupid }: InitialAttemptProps): ReactElement => {

  const compareDates = (dateOne: string, dateTwo: string, dateformat = 'DD.MM') => {

    // If the widget is in anniversary mode, the year is taken into consideration when comparing, otherwise only the month and date are compared.
    var dateA = new Date (0, parseInt(dateOne.substring((dateformat === "DD.MM" ? 3 : 0),(dateformat === "DD.MM" ? 5 : 2)))-1, parseInt(dateOne.substring((dateformat === "DD.MM" ? 0 : 3),(dateformat === "DD.MM" ? 2 : 5))));
    var dateB = new Date (0, parseInt(dateTwo.substring((dateformat === "DD.MM" ? 3 : 0),(dateformat === "DD.MM" ? 5 : 2)))-1, parseInt(dateTwo.substring((dateformat === "DD.MM" ? 0 : 3),(dateformat === "DD.MM" ? 2 : 5))));

    return {
      sameDate: dateA.getTime() === dateB.getTime(),
      sameMonth: dateA.getMonth() === dateB.getMonth(),
      daysDiff: Math.ceil((dateA.getTime() - dateB.getTime()) / (1000 * 60 * 60 * 24))
    }
  }

  const [usersList, setUsers] = React.useState([{}]);
  var usersByGroupCondition = {},
    dateNow = new Date().toLocaleDateString(dateformat == 'DD.MM' ? 'de-DE' : 'en-US', { year:'numeric', month: '2-digit', day: '2-digit' }),
    //TODO: check this logic
    daysSinceBeginningOfMonth = compareDates(dateNow, dateformat == 'DD.MM' ? '01' + dateNow.substring(2) : dateNow.substring(0,3) + '01' , dateformat).daysDiff,
    anniversariesCount = 0;

  const imgstyles: { [key: string]: React.CSSProperties } = {
    container: {
      width: '35px',
      height: '35px',
      verticalAlign: 'middle'
    },
  };

  const spanstyles: { [key: string]: React.CSSProperties } = {
    container: {
      width: '35px',
      height: '35px',
      backgroundColor: we.authMgr.getBranch().colors.backgroundColor,
      fontSize: '16px',
      lineHeight: '35px',
      color: '#ffffff',
      textAlign: 'center'
    },
  };

  const pstyles: { [key: string]: React.CSSProperties } = {
    container: {
      float: 'left'
    },
  };

  const h2styles: { [key: string]: React.CSSProperties } = {
    container: {
      color: '#a1a1a1'
    },
  };

  React.useEffect(() => {

    const getUsers = async (limit: number, offset:number, users:Array<Object>) => {
      const loadedUsers  = await we.api.getUsers({'status': 'activated', 'limit': limit, 'offset': offset});
      users = users.concat(loadedUsers.data);
      if(loadedUsers.total < limit + offset){
        //TODO: filter out users without the celebration date filled in their profiles
        setUsers(users);
      } else {
        await getUsers(limit, limit+offset, users);
      }
    };

    getUsers(100,0,[]).catch(console.error);
  }, []);

  const filteredUsers = usersList.filter(user => {
    if (user.groupIDs && user.groupIDs.includes(optoutgroupid)) return false;
    if (!user.profile || typeof(user.profile[anniversaryprofilefieldid]) === 'undefined') return false;
    if (user.profile[anniversaryprofilefieldid] == '' || user.profile[anniversaryprofilefieldid] == null) return false;
    var dateComparison = compareDates(user.profile[anniversaryprofilefieldid], dateNow, dateformat);
    if (showwholemonth === 'true') return dateComparison.sameMonth && daysSinceBeginningOfMonth <= showwholemonthforxdays && daysSinceBeginningOfMonth >= 0;
    return dateComparison.sameDate || 
              (dateComparison.daysDiff >= (- showdaysbefore) && dateComparison.daysDiff < 0) || 
              (dateComparison.daysDiff <= showdaysafter && dateComparison.daysDiff > 0);
  });
  filteredUsers.sort((userA,userB) => {
    return compareDates(userA.profile[anniversaryprofilefieldid], userB.profile[anniversaryprofilefieldid], dateformat).daysDiff;
  });

  const htmlList = filteredUsers.map(
    theUser => {
      var hasAvatar = typeof(theUser.avatar) !== 'undefined',
          userLink = we.authMgr.getBranchConfig().whitelabelConfig.frontendURL + "/profile/" + theUser.id;
      
      return <div key={theUser.id + 'div'}>
                <p key={theUser.id + 'p'} id={theUser.id} className="cw-entries">
                  <a key={theUser.id + 'a'} href={userLink} className="link-internal ally-focus-within">
                    {hasAvatar ? <img key={theUser.id + 'img'} data-type="thumb" data-size="35" aria-hidden="true" data-user-id={theUser.id} style={imgstyles.container} src={theUser.avatar?.thumb?.url} alt={theUser.firstName + " " + theUser.lastName}></img> :
                      <span key={theUser.id + 'span'} data-type="thumb" data-size="35" aria-hidden="true" data-user-id={theUser.id} style={spanstyles.container}>{theUser.firstName.substr(0,1) + theUser.lastName.substr(0,1)}</span>}
                    <p>{theUser.firstName} - {theUser.lastName}<br></br>- {theUser.profile ? theUser.profile[anniversaryprofilefieldid]?.substring(0,5) : ''}</p>
                    </a>
                </p>
              </div>
    });
  return (
    <div>
      <h2 id='cw-title' style={h2styles.container}>Happy Birthdays</h2>
      <div id='cw-list-container' key="userList">{htmlList}</div>
    </div>
  );

    
};
//<img key={theUser.id + 'img'} data-type="thumb" data-size="35" aria-hidden="true" data-user-id={theUser.id} style={styles.container} src={theUser.avatar?.thumb?.url} alt={theUser.firstName + " " + theUser.lastName}></img> {theUser.firstName} - {theUser.lastName} - {theUser.profile ? theUser.profile[anniversaryprofilefieldid]?.substring(0,5) : ''}