import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

import {useStyles} from './styles.js'

import logo from '../../assets/Logo.svg';

const Header = () => {
  const classes = useStyles();
  const account = useSelector((state) => state.allNft.account);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar className={classes.header}>
        <Toolbar>
          <Link to="/">
            <img src="https://images.squarespace-cdn.com/content/56676be4d82d5eb5365183e7/1451422356289-LKQOHOQ4Z3MQS1GDYC9K/Marketplace+icon.png?format=1000w&content-type=image%2Fpng" alt="Galerie" className={classes.logo} width="10px"/>

          </Link>
          <div className={classes.account}>
            <AccountBalanceWalletIcon titleAccess="Wallet Address" className={classes.walletIcon}/>
            <Typography variant="subtitle1">{account.slice(0,7)}...{account.slice(-4)}</Typography>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
};

export default Header;
