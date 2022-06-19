import styled from "styled-components";
import {Toolbar as MuiToolbar} from "@mui/material";

export const LogoContainer = styled.div`
    width: 100%;
    padding: 32px 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const AvatarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

export const Toolbar = styled(MuiToolbar)`
  height: 100px;
`;