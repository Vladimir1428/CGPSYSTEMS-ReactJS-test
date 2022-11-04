import React from "react";

export interface DropdownMenuProps{
    record: {
      client: string,
      credit: string,
      expandable: boolean,
      firstName: string,
      key: string,
      lastName: string,
      notes: string,
      since:  string,
      status: React.ReactElement
      totalEarnings: React.ReactElement,  
    } 
}