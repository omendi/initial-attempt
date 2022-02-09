/*!
 * Copyright 2021, Staffbase GmbH and contributors.
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

import { UiSchema } from "@rjsf/core";
import { JSONSchema7 } from "json-schema";

/**
 * schema used for generation of the configuration dialog
 * see https://react-jsonschema-form.readthedocs.io/en/latest/ for documentation
 */
export const configurationSchema: JSONSchema7 = {
  properties: {
    anniversaryprofilefieldid: {
      type: "string",
      title: "Profile Field ID"
    },
    dateformat: {
      type: "string",
      enum: ["DD.MM", "MM.DD"],
      title: "Date Format"
    },
    includepending: {
      type: "boolean",
      title: "Include Pending Users?",
      default: false
    },
    noinstancesmessage: {
      type: "string",
      title: "Message when there are no applicable users",
    },
    title: {
      type: "string",
      title: "Title",
    },
    todaytitle: {
      type: "string",
      title: "Today's Title",
    },
    yearword: {
      type: "string",
      title: "Year Word",
    },
    yearwordplural: {
      type: "string",
      title: "Year Word Plural",
    },
    showdate: {
      type: "boolean",
      title: "Show Celebration Date?",
      default: true
    },
    showwholemonth: {
      type: "boolean",
      title: "Show Celebrations from the Whole Month?",
      default: false
    },
    showwholemonthforxdays: {
      type: "number",
      title: "Number of days to show Month of Celebrations",
    },
    showdaysbefore: {
      type: "number",
      title: "Number of Days Before",
    },
    showdaysafter: {
      type: "number",
      title: "Number of Days After",
    },
    splitbyyear: {
      type: "boolean",
      title: "Split User's by Year?",
      default: false
    },
    specialyears: {
      type: "string",
      title: "Special Years",
    },
    linktochat: {
      type: "boolean",
      title: "Link to Chat?",
      default: false
    },
    limit: {
      type: "number",
      title: "Maximum Users to Show",
    },
    headercolor: {
      type: "string",
      title: "Header Color",
    },
    additionalfieldsdisplayed: {
      type: "string",
      title: "Additional Profile Fields to Display",
    },
    optoutgroupid: {
      type: "string",
      title: "Opt Out GroupID",
    }
  },
  required : ["anniversaryprofilefieldid", "dateformat"],
  dependencies: {
    includepending: {
      properties: {
        networkpluginid: { 
          type: "string",
          title: "Network Plugin ID" 
        },
      }
    },
    limit: {
      properties: {
        fullpageid: {
          type: "string",
          title: "Page ID",
        },
        fullpagetext: {
          type: "string",
          title: "Message Link to Full page",
        }
      }
    },
    showdaysbefore: {
      properties: {
        daysbeforetitle: {
          type: "string",
          title: "Days Before Title",
        }
      }
    },
    showdaysafter: {
      properties: {
        daysaftertitle: {
          type: "string",
          title: "Days After Title",
        }
      }
    }
  }
};

/**
 * schema to add more customization to the form's look and feel
 * @see https://react-jsonschema-form.readthedocs.io/en/latest/api-reference/uiSchema/
 */
export const uiSchema: UiSchema = {
  anniversaryprofilefieldid: {
    "ui:help": "Enter the profile field ID of the field that holds the date information",
  },
  dateformat: {
    "ui:help": "Enter the date format that the date is entered in."
  },
  includepending: {
    "ui:help": "Check to include pending users",
  },
  noinstancesmessage: {
    "ui:help": "Text that will be shown in the event that there are no applicable users",
  },
  title: {
    "ui:help": "The title of the widget",
  },
  todaytitle: {
    "ui:help": "The wording that will be shown above the users whose celebration is today",
  },
  yearword: {
    "ui:help": "The word to use for a the instance (Anniversary, Birthday, Year, etc)",
  },
  yearwordplural: {
    "ui:help": "The word to use for a the instance plural (Anniversaries, Birthdays, Years, etc)",
  },
  showdate: {
    "ui:help": "Select to show the user's date next to the user's name",
  },
  showwholemonth: {
    "ui:help": "Select to show all celebrations for the current month",
  },
  showwholemonthforxdays: {
    "ui:help": "Number of days that the month's worth of celebrations should be shown (starting at the beginning of the month)",
  },
  showdaysbefore: {
    "ui:help": "The number of previous days for which corresponding instances should be shown",
  },
  daysbeforetitle: {
    "ui:help": "The message that appears at the top of previous celebrations section",
  },
  showdaysafter: {
    "ui:help": "The number of upcoming days for which corresponding instances should be shown",
  },
  daysaftertitle: {
    "ui:help": "The message that appears at the top of upcoming celebrations section",
  },
  splitbyyear: {
    "ui:help": "Select if users should be split by year",
  },
  specialyears: {
    "ui:help": "If only certain years of celebrations should be shown, enter numbers separated by commas",
  },
  linktochat: {
    "ui:help": "Select if the link to a chat message should be shown, default is a link to the user's profile",
  },
  limit: {
    "ui:help": "Maximum number of users to be shown",
  },
  fullpageid: {
    "ui:help": "Page ID to the page with the full list of celebrations shown",
  },
  fullpagetext: {
    "ui:help": "Link text to link to page with the full list of celebrations",
  },
  headercolor: {
    "ui:help": "Hexcode color of the Header",
  },
  additionalfieldsdisplayed: {
    "ui:help": "Profile Field IDs to show next to user's name separated by commas",
  },
  optoutgroupid: {
    "ui:help": "Group ID of opt out group. Users in this group will not be shown in the widget",
  }
};
