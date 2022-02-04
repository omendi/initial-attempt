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
  enddate: number;
}

const calculatedifference = (startdate: number, enddate: number = Date.now()) => {
  const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24
  const distance = enddate - startdate
  const days = Math.floor(distance / day)
  const hours = Math.floor((distance % day) / hour)
  const minutes = Math.floor((distance % hour) / minute)
  const seconds = Math.floor((distance % minute) / second)

  return { days, hours, minutes, seconds }
}


export const InitialAttempt = ({ enddate }: InitialAttemptProps): ReactElement => {
  const [actualdate, setactualdate] = React.useState(Date.now())
  const { days, hours, minutes, seconds } = calculatedifference(actualdate, enddate)
  React.useEffect(() => {
    setInterval(() => {
      setactualdate(Date.now())
    }, 1000)
  }, [])

  return (
    <div>
      <ul>
        <li>
          <span>{days}</span> Days
        </li>
        <li>
          <span>{hours}</span> Hours
        </li>
        <li>
          <span>{minutes}</span> Minutes
        </li>
        <li>
          <span>{seconds}</span> Seconds
        </li>
      </ul>
    </div>
  )
  
  ;
};

