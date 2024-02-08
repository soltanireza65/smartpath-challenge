"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { FC } from "react";

type IProps = {
    children?: React.ReactNode;
};

const AppCard: FC<IProps> = ({ children }) => {
    return (
        <Card>
            <CardHeader />
            <CardContent>
                {children}
            </CardContent>
            {/* <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">fave</IconButton>
                <IconButton aria-label="share">share</IconButton>
            </CardActions> */}
        </Card>
    );
};

export default AppCard;
