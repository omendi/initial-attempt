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

import { userInfo } from "os";
import React, { ReactElement } from "react";
import { BlockAttributes } from "widget-sdk";

/**
 * React Component
 */
export interface InitialAttemptProps extends BlockAttributes {
  enddate: number;
}


export const InitialAttempt = ({ enddate }: InitialAttemptProps): ReactElement => {

  const [usersList, setUsers] = React.useState([{}]);

  const [user, setUser] = React.useState({});
  const [userHTML, setUH] = React.useState("");
  const [avatarURL, setAU] = React.useState("");
  const [userDate, setUP] = React.useState([]);

  /*React.useEffect(() => {
    const getUsers = async (limit: number, offset:number, users) => {
        const loadedUsers  = await we.api.getUsers({'status': 'activated', 'limit': limit, 'offset': offset});
        users = users.concat(loadedUsers.data);
        if(loadedUsers.total < limit + offset){
          setUsers(users);
        } else {
          setUsers(await getUsers(limit, limit+offset, users));
        }
      };

    getUsers(100,0,[]).catch(console.error);
  }, []);
*/

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: '35px',
    height: '35px',
    verticalAlign: 'middle'
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
/*
    const fetchUser = async () => {
      const user = await we.api.getUser("me");

      const userDate = user.profile["anniversarydate"].substring(0,5);

      setUser(user);
      setAU(user.avatar.thumb.url);
      setUP(userDate);

    }

    fetchUser().catch(console.error);*/
  }, []);

  
  /* return (
    <div>
      <a href={we.authMgr.getBranchConfig().whitelabelConfig.frontendURL + "/profile/" + user.id} class="link-internal ally-focus-within" ><img data-type="thumb" data-size="35" aria-hidden="true" data-user-id={user.id} style={styles.container} src={avatarURL} alt="Olivia Mende"></img> {user.firstName} - {user.lastName} - {userDate}</a>
      <div>{userHTML}</div>
    </div>
  ) */
  const htmlList = usersList.map(
    theUser => <div key={theUser.id + 'main'}>
      <a key={theUser.id + 'a'} href={we.authMgr.getBranchConfig().whitelabelConfig.frontendURL + "/profile/" + theUser.id} className="link-internal ally-focus-within" ><img key={theUser.id + 'img'} data-type="thumb" data-size="35" aria-hidden="true" data-user-id={theUser.id} style={styles.container} src={theUser.avatar?.thumb?.url} alt={theUser.firstName + " " + theUser.lastName}></img> {theUser.firstName} - {theUser.lastName} - {theUser.profile ? theUser.profile['anniversarydate'] : ''}</a>
    </div>
  );
  return (<div key="userList">{htmlList}</div>);

    
};
