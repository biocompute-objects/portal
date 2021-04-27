// src/views/resources/Resources/Citations.js

import React from 'react';
import { Card,
    CardActionArea,
    CardActions,
    CardContent,
    makeStyles,
    Typography
}from '@material-ui/core';

// Routing to pages
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  linkCard: {
      minHeight: '300px',
      textAlign: 'center'
  },
  supportCard: { 
    textAlign: 'Left',
    marginBottom:12,
      marginLeft: 12
  },
  title: {
    fontSize: '33px',
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Citations() {
  const classes = useStyles();
  var logo = require('src/images/logo.png')
  var registryLink = 'https://portal.aws.biochemistry.gwu.edu/registry'

  return (
    <Card className={classes.root, classes.supportCard} elevation={5}>
      <CardActionArea onClick={() => window.open(registryLink)}>
        <CardContent>
            <Typography className={classes.title}>
              <img src={logo} height={36} alt="BCO logo"/>
              BCO Citations<br/>
            </Typography>
            <Typography className={classes.supportCard} >
              <ol>

                <li>
                  <div vocab="http://schema.org" typeof="ScholarlyArticle"><p>
                    <span property="author">Patel JA, Dean DA, King CH, Xiao N, Koc S, Minina E, Golikov A, Brooks P, Kahsay R, Navelkar R, Ray M, Roberson D, Armstrong C, Mazumder R, Keeney J.</span><br/>
                    <span property="name">Bioinformatics tools developed to support BioCompute Objects.</span>
                    <span property="isPartOf" typeof="PublicationIssue"><span property="name" typeof="Periodical"> Database (Oxford)</span>.
                    <span property="datePublished">2021 March 31</span>;
                   <span property="isPartOf" typeof="PublicationVolume"><span property="volumeNumber"></span></span> PMID: <a property="sameAs" href="https://pubmed.ncbi.nlm.nih.gov/33784373/" target="_blank">33784373</a></span>.
                 </p></div>
                </li>

                <li>
                  <div vocab="http://schema.org" typeof="ScholarlyArticle"><p>
                    <span property="author">Alterovitz G, Dean D A, Goble C, Crusoe M R, Soiland-Reyes S, Bell A, Hayes A, King, C H S, Taylor D, Johanson E, Thompson E E, Donaldson E, Morizono H, Tsang H S, Goecks J, Yao J, Almeida J S, Krampis K, Guo L, Walderhaug M, Walsh P, Kahsay R, Gottipati S, Bloom T, Lai Y, Simonyan V, Mazumder R</span>.
                    <span property="name"> Enabling Precision Medicine via standard communication of HTS provenance, analysis, and results</span>.
                    <span property="isPartOf" typeof="PublicationIssue">
                    <span property="name" typeof="Peridical"> PLOS Biology; 16(12): e3000099</span>.
                    <span property="datePublished">2018.</span>
<a property="sameAs"   href="https://doi.org/10.1371/journal.pbio.3000099"  target="_blank"> https://doi.org/10.1371/journal.pbio.3000099</a>
                    </span></p>
                  </div>
                </li>

                <li>
                  <div vocab = "http://schema.org/" typeof="ScholarlyArticle"><p>
                  <span property="author">Simonyan V, Goecks J, Mazumder R</span>. 
                  <span property="name"> BioCompute objects - a step towards evaluation and validation of bio-medical scientific computations</span>.
                  <span property="isPartOf" typeof="PublicationIssue"><span property="name" typeof="Peridical"> PDA J Pharm Sci Technol</span>.
                  <span property="datePublished"> 2017</span>;
                  <span property="isPartOf" typeof="PublicationVolume"><span property="volumeNumber">71</span></span>(<span property="issueNumber">2</span>):136-146 PMID: <a property="sameAs" href="https://www.ncbi.nlm.nih.gov/pubmed/27974626" target="_blank">27974626</a></span>.
                </p></div>
                </li>

              </ol>
            </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}