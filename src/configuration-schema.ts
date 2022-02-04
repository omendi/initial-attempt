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
    profilefieldID: {
      type: "string",
      title: "Profile Field ID",
    },
    dateFormat: {
      type: "string",
      enum: ["DD.MM", "MM.DD"],
      title: "Date Format",
    },
    includePending: {
      type: "boolean",
      title: "Include Pending Users?",
    },
    noInstancesMessage: {
      type: "string",
      title: "Message when there are no applicable users",
    },
    title: {
      type: "string",
      title: "Title",
    },
    todayTitle: {
      type: "string",
      title: "Today's Title",
    },
    yearWord: {
      type: "string",
      title: "Year Word",
    },
    yearWordPlural: {
      type: "string",
      title: "Year Word Plural",
    },
    showDate: {
      type: "boolean",
      title: "Show Celebration Date?",
    },
    showWholeMonth: {
      type: "boolean",
      title: "Show Celebrations from the Whole Month?",
    },
    showDaysBefore: {
      type: "number",
      title: "Number of Days Before",
    },
    showDaysAfter: {
      type: "number",
      title: "Number of Days After",
    },
    splitByYear: {
      type: "boolean",
      title: "Split User's by Year?",
    },
    specialYears: {
      type: "string",
      title: "Special Years",
    },
    linkToChat: {
      type: "boolean",
      title: "Link to Chat?",
    },
    limit: {
      type: "number",
      title: "Maximum Users to Show",
    },
    headerColor: {
      type: "string",
      title: "Header Color",
    },
    additionalFieldsDisplayed: {
      type: "string",
      title: "Additional Profile Fields to Display",
    },
    optOutGroupID: {
      type: "string",
      title: "Opt Out GroupID",
    }
  },
  required : ["profilefieldID", "dateFormat", "noInstancesMessage", "yearWord", "yearWordPlural"],
  dependencies: {
    includePending: {
      properties: {
        networkPluginID: { 
          type: "string",
          title: "Network Plugin ID" 
        },
      },
      required: ["networkPluginID"]
    },
    limit: {
      properties: {
        fullPageID: {
          type: "string",
          title: "Page ID",
        },
        fullPageText: {
          type: "string",
          title: "Message Link to Full page",
        }
      }
    },
    showDaysBefore: {
      properties: {
        daysBeforeTitle: {
          type: "string",
          title: "Days Before Title",
        }
      }
    },
    showDaysAfter: {
      properties: {
        daysBeforeAfter: {
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
  profilefieldID: {
    "ui:help": "Enter the profile field ID of the field that holds the date information",
  },
  dateFormat: {
    "ui:help": "Enter the date format that the date is entered in."
  },
  includePending: {
    "ui:help": "Check to include pending users",
  },
  noInstancesMessage: {
    "ui:help": "Text that will be shown in the event that there are no applicable users",
  },
  title: {
    "ui:help": "The title of the widget",
  },
  todayTitle: {
    "ui:help": "The wording that will be shown above the users whose celebration is today",
  },
  yearWord: {
    "ui:help": "The word to use for a the instance (Anniversary, Birthday, Year, etc)",
  },
  yearWordPlural: {
    "ui:help": "The word to use for a the instance plural (Anniversaries, Birthdays, Years, etc)",
  },
  showDate: {
    "ui:help": "Select to show the user's date next to the user's name",
  },
  showWholeMonth: {
    "ui:help": "Select to show all celebrations for the current month",
  },
  showDaysBefore: {
    "ui:help": "The number of previous days for which corresponding instances should be shown",
  },
  daysBeforeTitle: {
    "ui:help": "The message that appears at the top of previous celebrations section",
  },
  showDaysAfter: {
    "ui:help": "The number of upcoming days for which corresponding instances should be shown",
  },
  daysBeforeAfter: {
    "ui:help": "The message that appears at the top of upcoming celebrations section",
  },
  splitByYear: {
    "ui:help": "Select if users should be split by year",
  },
  specialYears: {
    "ui:help": "If only certain years of celebrations should be shown, enter numbers separated by commas",
  },
  linkToChat: {
    "ui:help": "Select if the link to a chat message should be shown, default is a link to the user's profile",
  },
  limit: {
    "ui:help": "Maximum number of users to be shown",
  },
  fullPageID: {
    "ui:help": "Page ID to the page with the full list of celebrations shown",
  },
  fullPageText: {
    "ui:help": "Link text to link to page with the full list of celebrations",
  },
  headerColor: {
    "ui:help": "Hexcode color of the Header",
  },
  additionalFieldsDisplayed: {
    "ui:help": "Profile Field IDs to show next to user's name separated by commas",
  },
  optOutGroupID: {
    "ui:help": "Group ID of opt out group. Users in this group will not be shown in the widget",
  }
};
