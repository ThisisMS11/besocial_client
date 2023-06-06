// This file is to modify existing interface of mui as per typescript requirements

import { ThemeOptions } from "@mui/material";
import React from "react";

declare module '@mui/material/styles' {

    interface Theme {
        status: {
            danger: string
        }
    }
    // interface ThemeOptions {

    //     palette: {
    //         background: {
    //             default: string,
    //         }
    //     }
    // }
}