import styled from "styled-components";
import { Avatar, Chip } from "@mui/material";

export const ModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    position: absolute;
    padding: 32px;
    border-radius: 5px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
  
`
export const UserSummary = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0 0 16px 0;
    gap: 16px;
`;

export const Info = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin:  0;
    gap: 8px;
`;

export const Name = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin:  0;
    gap: 8px;
`;

export const StyledAvatar = styled(Avatar)`
    width: 72px;
    height: 72px;
`;

export const Row = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 8px;
`;

export const OutlinedInfo = styled(Chip)`
    min-width: 200px;
    border-radius: 5px;
`;

export const InconAndInfo = styled(Chip)`
    min-width: 200px;
    border-radius: 0px;
    border: none;
`;
