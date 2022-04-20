import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Web3 from "web3";

import { Card as MuiCard } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import SvgIcon from "@material-ui/core/SvgIcon";
import Divider from "@material-ui/core/Divider";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";

import CreateNFT from "../../pages/CreateNFT/index.js";

import { useStyles } from "./styles.js";
import { ReactComponent as EthereumLogo } from "../../assets/ethereum_logo.svg";

const Card = ({ tokenId, name, image, price, owner, isForSale }) => {
  const classes = useStyles();
  const price_one = price;
  const account = useSelector((state) => state.allNft.account);
  let show = false;
  let show2 = false;
  if(isForSale)
    show2 = true;
  if(account!=owner && isForSale)
    show = true;
  console.log(show,account,owner);

  console.log("Price of NFT:"+price);
  console.log("image: ", image);
  return (
    <Link to={`/nft/${tokenId}`}>
      <MuiCard className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={name}
            height="240"
            image={image}
            title={name}
          />
          <CardContent className={classes.content}>
            <div className={classes.title}>
              <Typography
                className={"MuiTypography--heading"}
                variant={"h5"}
                gutterBottom
              >
                {name}
              </Typography>
              <Chip
                size="small"
                disabled={!show2}
                label="Selling"
                className={classes.badge}
              />
              
              <Chip
                size="small"
                disabled={!show}
                label="Buyable"
                id="buyable"
                className={classes.badge2}
              />
            </div>
            <Typography variant="h6" className={classes.price}>
              <SvgIcon
                component={EthereumLogo}
                viewBox="0 0 400 426.6"
                titleAccess="ETH"
              />
              <span>{Web3.utils.fromWei(String(price_one), "ether")}</span>
              {/* <span>{CreateNFT.createNFT.getPrice()}</span> */}
             
            </Typography>
            <Divider className={classes.divider} light />
            <Typography
              variant={"body1"}
              align={"center"}
              className={classes.seller}
            >
              {owner.slice(0, 7)}...{owner.slice(-4)}
            </Typography>
          </CardContent>
        </CardActionArea>
      </MuiCard>
    </Link>
  );
};

export default Card;
