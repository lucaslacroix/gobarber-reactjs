import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
    max-width: 600px;
    margin: 50px auto;

    form {
        display: flex;
        flex-direction: column;
        margin-top: 30px;

        input {
            background: rgba(0, 0, 0, 0.1);
            border: none;
            border-radius: 4px;
            height: 44px;
            padding: 0 15px;
            color: #fff;
            margin: 0 0 10px;

            &::placeholder {
                color: rgba(255, 255, 255, 0.7);
            }
        }

        button {
            margin: 5px 0 0;
            height: 44px;
            background: #3b9eff;
            font-weight: bold;
            color: #fff;
            border: 0;
            border-radius: 4px;
            font-size: 1.6rem;
            transition: background 0.3s ease;

            &:hover {
                background: ${darken(0.05, '#3b9eff')};
            }
        }

        hr {
            border: 0;
            height: 1px;
            background-color: rgba(255, 255, 255, 0.2);
            margin: 10px 0 20px;
        }
        span {
            align-self: flex-start;
            margin: 0 0 10px;
            padding: 3px 10px;

            background: #f64c75;
            border-radius: 5px;
            font-weight: bold;
            color: #fff;
        }

        a {
            color: #fff;
            margin-top: 15px;
            font-size: 1.6rem;
            opacity: 0.8;
            transition: opacity 0.2s;
            &:hover {
                opacity: 1;
            }
        }
    }

    > button {
        margin: 5px 0 0;
        width: 100%;
        height: 44px;
        background: #f64c75;
        font-weight: bold;
        color: #fff;
        border: 0;
        border-radius: 4px;
        font-size: 1.6rem;
        transition: background 0.3s ease;

        &:hover {
            background: ${darken(0.08, '#f64c75')};
        }
    }
`;
