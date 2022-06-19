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
export const ButtonsContainer = styled.div`
    align-self: flex-end;
    display: flex;
    flex-direction: row;
    gap: 16px;
`
