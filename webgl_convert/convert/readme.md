

# WebGL Convert Tool

## Overview

The WebGL Convert Tool is a Python utility designed for converting 3D models from the Wavefront OBJ format to a JavaScript-readable format, facilitating the integration of 3D models into WebGL applications. This tool aims to streamline the process of bringing 3D assets into web environments, making it easier for developers to incorporate complex 3D models into their web applications.

## Features

- **Simple CLI Interface**: Easily convert your OBJ files to JavaScript with a straightforward command-line interface.
- **Customizable Output**: The tool supports custom naming for the JavaScript output, allowing seamless integration into existing WebGL projects.
- **Efficiency**: Optimized for fast conversion, enabling quick iteration and development of 3D web applications.

## Getting Started

### Prerequisites

- Python 2.7 or later

### Installation

Clone the repository to get started with the WebGL Convert Tool:

```bash
git clone https://github.com/lookang/codesforejss.git
cd codesforejss/webgl_convert/convert
```

### Usage

Convert your OBJ files to JavaScript format using the following command:

```bash
python2 convert.py input.obj Object3D_output.js
```

Optionally, you can specify a custom variable name for the JavaScript output:

```bash
python2 convert.py input.obj output.js --var_name=Object3D_output.js
```

### Examples

Converting a model named `Raincloud.obj` to `Raincloud.js` with the default variable name:

```bash
python convert.py Raincloud.obj Object3D_Raincloud.js
```

Converting with a custom variable name:

```bash
python convert.py Raincloud.obj Raincloud.js --var_name=Object3D_cloud
```

## Contributing

We welcome contributions to the WebGL Convert Tool! Please feel free to submit issues, pull requests, or suggest new features to make the tool more useful for the community.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- This tool was developed as part of the larger [codesforejss](https://github.com/lookang/codesforejss) project, aimed at providing educational resources in physics and 3D simulations.

## Example of WebGL 3D
https://iwant2study.org/ospsg/index.php/interactive-resources/physics/01-foundations-of-physics/energy-fields/07-energy-work-power/1191-solar-panels-and-tilt-angle-optimization
https://iwant2study.org/ospsg/index.php/interactive-resources/mathematics/measurement-and-geometry/geometry/2-3d-shapes/438-glimbal8wee02-1
