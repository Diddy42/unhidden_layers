import React from 'react';
import Container from 'react-bootstrap/Container';
import ULNavbar from './ULNavbar';
import Image from 'react-bootstrap/Image';
import modelImage from './images/mobilenetv2.png';
import cnnImage from './images/cnn_visualization.jpeg';
import matrixImage from './images/matrix.png';
import edgesImage from './images/edges.jpg';

class ExplanationPage extends React.Component {
    render(){
        return <>
            <ULNavbar/>
            <Container fluid className="text-center">
                <h2>What am I looking at?</h2>
                <p className="lead">This webapp lets you peek inside one of those neural networks used for image classification.</p>
                <p className="lead">The specific neural network used is MobileNetV2: a very lightweight model, although not as accurate as the bigger ones.</p>
                <Image src={modelImage} width="700" height="541"/>
                <br></br>
                <br></br>

                <h2>Convolutions</h2>
                <p className="lead">These networks, also called convolutional neural networks, work by sequentially applying a series of transformations to the source image.</p>
                <p className="lead">These transformations are called convolutions.</p>
                <Image src={cnnImage}/>
                <br></br>
                <br></br>
                <br></br>

                <p className="lead">There is a huge number of different convolutions that can be applied to an image.</p>
                <p className="lead">In fact, a convolution can be specified by a matrix like this one:</p>
                <Image src={matrixImage}/>
                <br></br>

                <p className="lead">Any combination of numbers in the matrix is a possible convolution.</p>
                <p className="lead">That specific convolution, for example, performs some simple edge detection, with results similar to this:</p>
                <Image src={edgesImage}/>
                <br></br>
                <br></br>

                <h2>Convolutional neural networks</h2>
                <p className="lead">Convolutional neural networks, like MobileNetV2, learn the most useful convolutions to apply to extract the relevant features of images.</p>
            
                <h2>Unhidden layers</h2>
                <p className="lead">When you upload an image to this webapp and click 'extract', random convolution outputs are taken from its passage through MobileNetV2 and shown on screen.</p>
            </Container>
        </>
    }
}

export default ExplanationPage;

