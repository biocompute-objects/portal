---
title: "Resources"
menu: "main"
---

<div class="col-lg-6 offset-lg-3 text-center">
<img src="/images/logo.about.png" class="img-fluid mx-auto d-block" width="75%" alt="">
</div>

<br>

To cite BioCompute, please use:
1. [Biocompute Objects-A Step towards Evaluation and Validation of Biomedical Scientific Computations](https://pubmed.ncbi.nlm.nih.gov/27974626/)<br> 
2. [Enabling precision medicine via standard communication of HTS provenance, analysis, and results](https://pubmed.ncbi.nlm.nih.gov/30596645/)

<br>

### Table of contents

<a href="#BCO Portal">BCO Portal</a> <br>
<a href="#Platform Specific Tools">Platform Specific Tools</a> <br>
<a href="#BCO Community">BCO Community</a> <br>
<a href="#BCO Documentation">BCO Documentation</a> <br>
<a href="#Software Packages">Software Packages</a> <br>
<a href="#BCO Registry">BCO Registry</a> <br>
<a href="#BCO Aggregator">BCO Aggregator</a> <br>
<a href="#BCO Cheat Sheet">BCO Cheat Sheet</a> <br>
<a href="#References">References</a><br>


<br>

Publicly available resources developed by the BioCompute community include:

<a name="BCO Portal"></a>
### BCO Portal

The [BCO Portal](https://portal.aws.biochemistry.gwu.edu/) is a form based creation tool for generating BioCompute Objects. The BCO Portal contains built-in linting and conformance against the current BioCompute specification. The BCO Portal includes a database of created BCOs. Unless specified in the embargo field, BCOs in the database are viewable to the general public.

<a name="Platform Specific Tools"></a>
### Platform Specific Tools

#### HIVE BCO App

The High-throughput Integrated Virtual Environment ([HIVE](https://hive.biochemistry.gwu.edu/dna.cgi?cmd=main)) for genome analysis and the widely used, open source Galaxy project both have platform specific tools for generating BioCompute Objects from workflows. Both of these can be found on our [home page](/#tools).

#### Cancer Genomics Cloud BCO App

The [Cancer Genomics Cloud](https://www.cancergenomicscloud.org/) (CGC) has a powerful tool built into the CGC platform to capture and export a workflow as a BioCompute Object.

#### Galaxy BCO Extension
The [Galaxy BCO API Extension](https://galaxy.aws.biochemistry.gwu.edu/) enables Galaxy users to the export of Galaxy "workflow invocations" (i.e. realizations of a computational pipeline) in BCO format. 


<a name="BCO Community"></a>
### BCO Community

- The [BCO Gitter](https://gitter.im/biocompute-objects/) has spaces for general discussion, technical development, BCO implementation, and networking.


<a name="BCO Documentation"></a>
### BCO Documentation

- The [BCO SOP](/BCO_SOP) provides guidance on BCO creation, versioning, and certification.
- The [BCO User Manual](/BCO_UserManual) provides guidance on BCO evaluation.
- The [BCO RO Tutorial](https://biocompute-objects.github.io/bco-ro-crate/) shows how a BCO can be packaged/archived/transmitted/described as an RO-Crate Research Object, using a running [example of a Nextflow workflow](github.com/biocompute-objects/bco-ro-example-chipseq). **Work in progress**


<a name="Software Packages"></a>
### Software Packages

- The R package [biocompute](https://cran.r-project.org/package=biocompute) can create, validate, and export BioCompute Objects. Users can encode information in data frames, and compose BioCompute Objects from the domains defined by the standard. A checksum validator and a JSON schema validator are provided. Also supports exporting BioCompute Objects as JSON, PDF, HTML, or Word documents, and exporting to cloud-based platforms.


<a name="BCO Registry"></a>
### BCO Registry

- The BioCompute consortium maintains a database of [registered authorities](https://biocomputeobject.org/registry.html). Registered authorities are able to assign their own IDs in the `object_id` field, such as gwu000001.


<a name="BCO Aggregator"></a>
### BCO Aggregator (under construction)

- The BioCompute consortium maintains a database of submitted BCOs. The database acts as a mirror that generates checksums for validation.


<a name="BCO Cheat Sheet"></a>
### BCO "Cheat Sheet"

- A [quick reference guide](/BCOCheatSheet.pdf) (PDF) for getting up to speed with reading a BCO.


<a name="References"></a>
### References

1. [2791-2020 IEEE Standard](https://opensource.ieee.org/2791-object/ieee-2791-schema/)<br>
The official IEEE standard, known as IEEE 2791-2020.

1. [Repository](https://standards.ieee.org/standard/2791-2020.html)<br>
The open source repository referenced by the standard. Three formats of the publication are available.

1. [Semantic Versioning](https://semver.org/spec/v2.0.0.html)<br>
BioCompute versioning is based on semantic versioning, but does not use the "major" value in "major.minor.patch" (e.g. `2.4.11`).

    - Use "minor" increments for additions (e.g. the addition of a "`reviewedBy`" block).
    - Use "patch" for minor fixes (e.g. editorial spelling corrections).
    - There is no "major" increment in BCO versioning. A BCO is a record of a specific instance of an analysis, so major changes result in a new BCO.

1. [Provenance Ontology](https://jbiomedsem.biomedcentral.com/articles/10.1186/2041-1480-4-37)<br>
Contributor roles in a BCO are explicitly defined according to the Prov-O standard, and include roles for reviewing a BCO, creating the content in a BCO, and for authoring the BCO itself.

1. [JSON Schema](https://json-schema.org/draft/2019-09/json-schema-core.html)<br>
BioCompute is based heavily on the JSON Schema media type. Definitions and format within the BCO Schema adhere to "draft-handrews-json-schema-02."



