import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';

// Rendering dynamic JSON.
import RecursiveJson from './RecursiveJson'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%'
  }
}));

const Editor = () => {
  const classes = useStyles();

  // Define the JSON object.
   /*
  const objected = {
      "menu": {
        "id": "file",  
        "value": "File",  
        "popup": {  
          "menuitem": [  
            {"value": "New", "onclick": "CreateDoc()"},  
            {"value": "Open", "onclick": "OpenDoc()"},  
            {"value": "Save", "onclick": "SaveDoc()"}  
          ]  
        },
        "other": {  
          "othermenuitems": [  
            {"value": "New", "onclick": "CreateDoc()"},  
            {"value": "Open", "onclick": "OpenDoc()"},  
            {"value": "Save", "onclick": "SaveDoc()"}  
          ]  
        }
      }
  };

*/

   
  const objected = {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "$id": "https://w3id.org/ieee/ieee-2791-schema/2791object.json",
      "type": "object",
      "title": "Base type for all IEEE-2791 Objects",
      "description": "All IEEE-2791 object types must adhear to this type in order to be compliant with IEEE-2791 standard",
      "required": [
          "object_id",
          "spec_version",
          "etag",
          "provenance_domain",
          "usability_domain",
          "description_domain",
          "execution_domain",
          "io_domain"
      ],
      "definitions": {
          "object_id": {
              "type": "string",
              "description": "A unique identifier that should be applied to each IEEE-2791 Object instance, generated and assigned by a IEEE-2791 database engine. IDs should never be reused"
          },
          "uri": {
              "type": "object",
              "description": "Any of the four Resource Identifers defined at https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-7.3.5",
              "additionalProperties": "false",
              "required": [
                  "uri"
              ],
              "properties": {
                  "filename": {
                      "type": "string"
                  },
                  "uri": {
                      "type": "string",
                      "format": "uri"
                  },
                  "access_time": {
                      "type": "string",
                      "description": "Time stamp of when the request for this data was submitted",
                      "format": "date-time"
                  },
                  "sha1_checksum": {
                      "type": "string",
                      "description": "output of hash function that produces a message digest",
                      "pattern": "[A-Za-z0-9]+"
                  }
              }
          }, 
          "contributor": {
              "type": "object",
              "description": "Contributor identifier and type of contribution (determined according to PAV ontology) is required",
              "required": [
                  "contribution",
                  "name"
              ],
              "additionalProperties": "false",
              "properties": {
                  "name": {
                      "type": "string",
                      "description": "Name of contributor",
                      "examples": [
                          "Charles Darwin"
                      ]
                  },
                  "affiliation": {
                      "type": "string",
                      "description": "Organization the particular contributor is affiliated with",
                      "examples": [
                          "HMS Beagle"
                      ]
                  },
                  "email": {
                      "type": "string",
                      "description": "electronic means for identification and communication purposes",
                      "examples": [
                          "name@example.edu"
                      ],
                      "format": "email"
                  },
                  "contribution": {
                      "type": "array",
                      "description": "type of contribution determined according to PAV ontology",
                      "reference": "https://doi.org/10.1186/2041-1480-4-37",
                      "items": {
                          "type": "string",
                          "enum": [
                              "authoredBy",
                              "contributedBy",
                              "createdAt",
                              "createdBy",
                              "createdWith",
                              "curatedBy",
                              "derivedFrom",
                              "importedBy",
                              "importedFrom",
                              "providedBy",
                              "retrievedBy",
                              "retrievedFrom",
                              "sourceAccessedBy"
                          ]
                      }
                  },
                  "orcid": {
                      "type": "string",
                      "description": "Field to record author information. ORCID identifiers allow for the author to curate their information after submission. ORCID identifiers must be valid and must have the prefix ‘https://orcid.org/’",
                      "examples": [
                          "http://orcid.org/0000-0002-1825-0097"
                      ],
                      "format": "uri"
                  }
              }
          }
      },
      "additionalProperties": "false",
      "properties": {
          "object_id": {
              "$ref": "#/definitions/object_id",
              "readOnly": "true"
          },
          "spec_version": {
              "type": "string",
              "description": "Version of the IEEE-2791 specification used to define this document",
              "examples": [
                  "https://w3id.org/ieee/ieee-2791-schema/"
              ],
              "readOnly": "true",
              "format": "uri"
          },
          "etag": {
              "type": "string",
              "description": "See https://tools.ietf.org/html/rfc7232#section-2.1 for full description. It is recommended that the ETag be deleted or updated if the object file is changed (except in cases using weak ETags in which the entirety of the change comprises a simple re-writing of the JSON).",
              "examples": [
                  "5986B05969341343E77A95B4023600FC8FEF48B7E79F355E58B0B404A4F50995"
              ],
              "readOnly": "true",
              "pattern": "^([A-Za-z0-9]+)$"
          },
          "provenance_domain": {
              "$ref": "provenance_domain.json"
          },
          "usability_domain": {
              "$ref": "usability_domain.json"
          },
          "extension_domain": {
              "type": "array",
              "description": "An optional domain that contains user-defined fields.",
              "items":{
                  "required":[
                      "extension_schema"
                  ],
                  "additionalProperties": "true",
                  "properties": {
                      "extension_schema":{
                          "title": "Extension Schema",
                          "description": "resolving this URI should provide this extension's JSON Schema",
                          "type": "string",
                          "format": "uri"
                      }
                  }
              }
          },
          "description_domain": {
              "$ref": "description_domain.json"
          },
          "execution_domain": {
              "$ref": "execution_domain.json"
          },
          "parametric_domain": {
              "$ref": "parametric_domain.json"
          },
          "io_domain": {
              "$ref": "io_domain.json"
          },
          "error_domain": {
              "$ref": "error_domain.json"
          }
      }
  };

  /*

  const objected = {
    "bco_id": "https://w3id.org/biocompute/1.3.0/examples/HCV1a.json",
    "checksum": "06DACE70679F35BA87A3DD6FFFED4ED24A4F5B8C2571264C37E5F1B3ADE04A31",
    "bco_spec_version" : "https://w3id.org/biocompute/1.3.0/",
    "provenance_domain": {
        "name": "HCV1a ledipasvir resistance SNP detection", 
        "version": "2.9",
        "review": [
            {
                "status": "approved",
                "reviewer_comment": "Approved by GW staff. Waiting for approval from FDA Reviewer",
                "date": "2017-11-12T12:30:48-0400",
                "reviewer": {
                    "name": "Charles Hadley King", 
                    "affiliation": "George Washington University", 
                    "email": "hadley_king@gwu.edu",
                    "contribution": ["curatedBy"],
                    "orcid": "https://orcid.org/0000-0003-1409-4549"
                }
            },
            {
                "status": "approved",
                "reviewer_comment": "The revised BCO looks fine",
                "date": "2017-12-12T12:30:48-0400",
                "reviewer": {
                    "name": "Eric Donaldson", 
                    "affiliation": "FDA", 
                    "email": "Eric.Donaldson@fda.hhs.gov",
                    "contribution": ["curatedBy"]
                }
            }
        ],
        "obsolete_after" : "2118-09-26T14:43:43-0400",
        "embargo" : {
            "start_time": "2000-09-26T14:43:43-0400",
            "end_time": "2000-09-26T14:43:45-0400"
        },
        "created": "2017-01-24T09:40:17-0500", 
        "modified": "2018-09-21T14:06:14-0400", 
        "contributors": [
            {
                "name": "Charles Hadley King", 
                "affiliation": "George Washington University", 
                "email": "hadley_king@gwu.edu",
                "contribution": ["createdBy", "curatedBy"],
                "orcid": "https://orcid.org/0000-0003-1409-4549"
            },
            {
                "name": "Eric Donaldson", 
                "affiliation": "FDA", 
                "email": "Eric.Donaldson@fda.hhs.gov",
                "contribution": ["authoredBy"]
            }
        ],
        "license": "https://spdx.org/licenses/CC-BY-4.0.html"
    },
    "usability_domain": [
        "Identify baseline single nucleotide polymorphisms (SNPs)[SO:0000694], (insertions)[SO:0000667], and (deletions)[SO:0000045] that correlate with reduced (ledipasvir)[pubchem.compound:67505836] antiviral drug efficacy in (Hepatitis C virus subtype 1)[taxonomy:31646]", 
        "Identify treatment emergent amino acid (substitutions)[SO:1000002] that correlate with antiviral drug treatment failure", 
        "Determine whether the treatment emergent amino acid (substitutions)[SO:1000002] identified correlate with treatment failure involving other drugs against the same virus", 
        "GitHub CWL example: https://github.com/mr-c/hive-cwl-examples/blob/master/workflow/hive-viral-mutation-detection.cwl#L20"
    ],
    "extension_domain":{
        "fhir_extension": [
            {
                "fhir_endpoint": "http://fhirtest.uhn.ca/baseDstu3",
                "fhir_version": "3",
                "fhir_resources": [
                    {
                        "fhir_resource": "Sequence",
                        "fhir_id": "21376"
                    },
                    {
                        "fhir_resource": "DiagnosticReport",
                        "fhir_id": "6288583"
                    },
                    {
                        "fhir_resource": "ProcedureRequest",
                        "fhir_id": "25544"
                    },
                    {
                        "fhir_resource": "Observation",
                        "fhir_id": "92440"
                    },
                    {
                        "fhir_resource": "FamilyMemberHistory",
                        "fhir_id": "4588936"
                    }
                ]
            }
        ],
        "scm_extension": {
            "scm_repository": "https://github.com/example/repo1",
            "scm_type": "git",
            "scm_commit": "c9ffea0b60fa3bcf8e138af7c99ca141a6b8fb21",
            "scm_path": "workflow/hive-viral-mutation-detection.cwl",
            "scm_preview": "https://github.com/example/repo1/blob/c9ffea0b60fa3bcf8e138af7c99ca141a6b8fb21/workflow/hive-viral-mutation-detection.cwl"
      }
    },
    "description_domain": {
        "keywords": [
            "HCV1a", 
            "Ledipasvir", 
            "antiviral resistance", 
            "SNP", 
            "amino acid substitutions"
        ], 
        "xref": [
            {
                "namespace": "pubchem.compound",
                "name": "PubChem-compound",
                "ids": ["67505836"], 
                "access_time": "2018-13-02T10:15-05:00"
            },
            {
                "namespace": "pubmed",
                "name": "PubMed",
                "ids": ["26508693"], 
                "access_time": "2018-13-02T10:15-05:00"
            },
            {
                "namespace": "so",
                "name": "Sequence Ontology",
                "ids": ["SO:000002", "SO:0000694", "SO:0000667", "SO:0000045"], 
                "access_time": "2018-13-02T10:15-05:00"
            },
            {
                "namespace": "taxonomy",
                "name": "Taxonomy",
                "ids": ["31646"], 
                "access_time": "2018-13-02T10:15-05:00"
            }
        ],
        "platform": ["HIVE"],
        "pipeline_steps": [
            {
                "step_number": 1, 
                "name": "HIVE-hexagon", 
                "description": "Alignment of reads to a set of references", 
                "version": "1.3", 
                "prerequisite": [
                    {
                        "name": "Hepatitis C virus genotype 1", 
                        "uri": {
                            "uri": "http://www.ncbi.nlm.nih.gov/nuccore/22129792",
                            "access_time": "2017-01-24T09:40:17-0500"
                        }
                    }, 
                    {
                        "name": "Hepatitis C virus type 1b complete genome", 
                        "uri": {
                            "uri": "http://www.ncbi.nlm.nih.gov/nuccore/5420376",
                            "access_time": "2017-01-24T09:40:17-0500"
                        }
                    }, 
                    {
                        "name": "Hepatitis C virus (isolate JFH-1) genomic RNA", 
                        "uri": {
                            "uri": "http://www.ncbi.nlm.nih.gov/nuccore/13122261",
                            "access_time": "2017-01-24T09:40:17-0500"
                        }
                    }, 
                    {
                        "name": "Hepatitis C virus clone J8CF, complete genome", 
                        "uri": {
                            "uri": "http://www.ncbi.nlm.nih.gov/nuccore/386646758",
                            "access_time": "2017-01-24T09:40:17-0500"
                        }
                    }, 
                    {
                        "name": "Hepatitis C virus S52 polyprotein gene", 
                        "uri": {
                            "uri": "http://www.ncbi.nlm.nih.gov/nuccore/295311559",
                            "access_time": "2017-01-24T09:40:17-0500"
                        }
                    }
                ], 
                "input_list": [
                    {
                        "uri": "http://example.com/dna.cgi?cmd=objFile&ids=514683",
                        "access_time": "2017-01-24T09:40:17-0500"
                    }, 
                    {
                        "uri": "http://example.com/dna.cgi?cmd=objFile&ids=514682",
                        "access_time": "2017-01-24T09:40:17-0500"
                    }
                ],
                "output_list": [
                    {
                        "uri": "http://example.com/data/514769/allCount-aligned.csv",
                        "access_time": "2017-01-24T09:40:17-0500"
                    }
                ]
            },
            {
                "step_number": 2, 
                "name": "HIVE-heptagon", 
                "description": "variant calling", 
                "version": "1.3", 
                "input_list": [
                    {
                        "uri": "http://example.com/data/514769/dnaAccessionBased.csv",
                        "access_time": "2017-01-24T09:40:17-0500"
                    }
                ], 
                "output_list": [
                    {
                        "uri": "http://example.com/data/514801/SNPProfile.csv",
                        "access_time": "2017-01-24T09:40:17-0500"
                    }, 
                    {
                        "uri": "http://example.com/data/14769/allCount-aligned.csv",
                        "access_time": "2017-01-24T09:40:17-0500"
                    }
                ]
            }
        ]
    },
    "execution_domain": {
        "script":[
            {
                "uri": {
                    "uri": "https://example.com/workflows/antiviral_resistance_detection_hive.py"
                }
            }
        ],
        "script_driver": "shell", 
        "software_prerequisites": [
            {
                "name": "HIVE-hexagon", 
                "version": "babajanian.1",
                "uri": {
                    "uri": "http://example.com/dna.cgi?cmd=dna-hexagon&cmdMode=-",
                    "access_time": "2017-01-24T09:40:17-0500",
                    "sha1_checksum": "d60f506cddac09e9e816531e7905ca1ca6641e3c"
                }
			}, 
            {
                "name": "HIVE-heptagon", 
                "version": "albinoni.2",
                "uri": {
                    "uri": "http://example.com/dna.cgi?cmd=dna-heptagon&cmdMode=-",
                    "access_time": "2017-01-24T09:40:17-0500"
                }
            }
        ],
        "external_data_endpoints": [
            {
                "name": "HIVE", 
                "url": "http://example.com/dna.cgi?cmd=login"
            }, 
            {
                "name": "access to e-utils", 
                "url": "http://eutils.ncbi.nlm.nih.gov/entrez/eutils/"
            }
        ], 
        "environment_variables": {
            "HOSTTYPE": "x86_64-linux",
            "EDITOR": "vim"
        }
    }, 
    "parametric_domain": [
        {"param": "seed", "value": "14", "step": "1"},
        {"param":"minimum_match_len", "value": "66", "step": "1"},
        {"param": "divergence_threshold_percent", "value": "0.30", "step": "1"},
        {"param": "minimum_coverage", "value": "15", "step": "2"},
        {"param": "freq_cutoff", "value": "0.10", "step": "2"}
    ], 
    "io_domain": {
        "input_subdomain": [
            {
                "uri": {
                    "filename": "Hepatitis C virus genotype 1", 
                    "uri": "http://www.ncbi.nlm.nih.gov/nuccore/22129792",
                    "access_time": "2017-01-24T09:40:17-0500"
                }
            }, 
            {
                "uri": {
                    "filename": "Hepatitis C virus type 1b complete genome", 
                    "uri": "http://www.ncbi.nlm.nih.gov/nuccore/5420376",
                    "access_time": "2017-01-24T09:40:17-0500"
                }
            }, 
            {
                "uri": {
                    "filename": "Hepatitis C virus (isolate JFH-1) genomic RNA", 
                    "uri": "http://www.ncbi.nlm.nih.gov/nuccore/13122261",
                    "access_time": "2017-01-24T09:40:17-0500"
                }
            }, 
            {
                "uri": {
                    "uri": "http://www.ncbi.nlm.nih.gov/nuccore/386646758",
                    "access_time": "2017-01-24T09:40:17-0500"
                }
            }, 
            {
                "uri": {
                    "filename": "Hepatitis C virus S52 polyprotein gene", 
                    "uri": "http://www.ncbi.nlm.nih.gov/nuccore/295311559",
                    "access_time": "2017-01-24T09:40:17-0500"
                }
            },
            {
                "uri": {
                    "filename": "HCV1a_drug_resistant_sample0001-01", 
                    "uri": "http://example.com/nuc-read/514682",
                    "access_time": "2017-01-24T09:40:17-0500"
                }
            }, 
            {
 
                "uri": {
                    "filename": "HCV1a_drug_resistant_sample0001-02",
                    "uri": "http://example.com/nuc-read/514683",
                    "access_time": "2017-01-24T09:40:17-0500"
                }
            }
        ], 
        "output_subdomain": [
            {
                "mediatype": "text/csv", 
                "uri": { 
                    "uri": "http://example.com/data/514769/dnaAccessionBased.csv",
                    "access_time": "2017-01-24T09:40:17-0500"
                }
            },
            {
                "mediatype": "text/csv", 
                "uri": {
                    "uri": "http://example.com/data/514801/SNPProfile*.csv",
                    "access_time": "2017-01-24T09:40:17-0500"
                }
            }
        ]
    },
    "error_domain": {
        "empirical_error": {
            "false_negative_alignment_hits": "<0.0010", 
            "false_discovery": "<0.05"
        }, 
        "algorithmic_error": { 
            "false_positive_mutation_calls_discovery": "<0.00005", 
            "false_discovery": "0.005"
        }
    }
}

*/

  
  return (
    <Page
      className={classes.root}
      title="Products"
    >
      <Container maxWidth={false}>
        {/* <Toolbar /> */}
        <Box mt={3}>
          <Grid
            container
            spacing={3}
          >
            <RecursiveJson items={objected} propertiesFlag={false} ulFlag={false} />
          </Grid>
        </Box>
      </Container>
    </Page>
  );
};

export default Editor;
