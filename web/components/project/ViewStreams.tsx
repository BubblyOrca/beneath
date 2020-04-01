import React, { FC } from "react";

import { List, ListItem, ListItemAvatar, ListItemText, makeStyles, Typography } from "@material-ui/core";

import { ProjectByOrganizationAndName_projectByOrganizationAndName } from "../../apollo/types/ProjectByOrganizationAndName";
import { toURLName } from "../../lib/names";
import Avatar from "../Avatar";
import NextMuiLinkList from "../NextMuiLinkList";

interface ViewStreamsProps {
  project: ProjectByOrganizationAndName_projectByOrganizationAndName;
}

const useStyles = makeStyles((theme) => ({
  noDataCaption: {
    color: theme.palette.text.secondary,
  },
}));

const ViewStreams: FC<ViewStreamsProps> = ({ project }) => {
  const classes = useStyles();
  return (
    <>
      <List>
        {project.streams.map(({ streamID, name, description, external }) => (
          <ListItem
            key={streamID}
            component={NextMuiLinkList}
            href={`/${toURLName(project.organization.name)}/${toURLName(project.name)}/streams/${toURLName(name)}`}
            button
            disableGutters
          >
            <ListItemAvatar>
              <Avatar size="list" label={external ? "Root" : "Derived"} />
            </ListItemAvatar>
            <ListItemText primary={toURLName(name)} secondary={description} />
          </ListItem>
        ))}
      </List>
      {project.streams.length === 0 && (
        <Typography className={classes.noDataCaption} variant="body1" align="center">
          There are no streams in this project
        </Typography>
      )}
    </>
  );
};

export default ViewStreams;
