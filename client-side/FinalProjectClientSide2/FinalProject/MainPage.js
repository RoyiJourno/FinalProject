import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { RNS3 } from 'react-native-aws3';
import { aws } from './keys';
import SearchableList from './SearchableList'

export default class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileContain:[
                file = '',
                filePath = '',
                fileName = ''
            ],
            newConfig:'',
            tag:'',
            type:'',
            keyPrefix:''
            
        };

    }

     
    UploadToAWS() {

        if(this.state.keyPrefix!=''){
        if (this.state.keyPrefix[0] == '/') 
            alert('you need to choose tag!');
        
        else {
            RNS3.put(this.state.fileContain.file, this.state.newConfig)
                .then((response) => {
                    if(response.status == 201)
                        alert('upload Successful');
                        else
                        alert('Error');
                    
                });
        }
    }
    else alert('Nothing to Upload...');        
    }


    takePic() {
        ImagePicker.showImagePicker({}, (response) => {
            if(!response.didCancel){
                const file = {
                uri: response.uri,
                name: '',
                type: 'image/png'
            }
            let fileName = file.uri.split('/');
            file.name = fileName.pop();
            this.setState({type: '/Photos/'});
            let fileContain = {
                file: file,
                filePath: file.uri,
                fileName: file.name,
        }
        this.setState({ fileContain });
        this.keyPrefixName();

    }
        })
    }

    takeVideo() {
        let option = {
            mediaType: "video",
            title: "Select a video",
            takePhotoButtonTitle: "take a video",
            chooseFromlibraryButtonTitle: "choose from gallery",
            cancelButtonTitle: "Cancel"
        }
        ImagePicker.showImagePicker(option, (response) => {
            if(!response.didCancel){
            const file = {
                uri: response.uri,
                name: 'Video_',
                type: 'video/mp4'
            }
            let fileName = file.uri.split('/');
            file.name += fileName.pop();
            this.setState({type: '/Videos/'});
            let fileContain = {
                file: file,
                filePath: file.uri,
                fileName: file.name,
        }
        this.setState({ fileContain });
        this.keyPrefixName();
    }
        })
    }

    takeSound = (filePath) => {
        this.setState({ filePath });
        this.setState({type: '/Sounds/'});
        const file = {
            uri: 'file://' + filePath,
            name: '',
            type: 'audio/mpeg'
        }
        let fileName = file.uri.split('/');
        file.name = fileName.pop();
        let fileContain = {
            file: file,
            filePath: file.uri,
            fileName: file.name,
    }
        this.setState({ fileContain });
        this.keyPrefixName();

    }

    MoveToSoundRecordPage = () => {
        this.props.navigation.navigate('SoundRecord', { takeSound: this.takeSound });

    }

    keyPrefixName(){
        let keyPrefix = this.state.tag + this.state.type;
        let newConfig = {
            keyPrefix : keyPrefix,
            bucket: 'abilisense',
            region: 'us-east-1',
            accessKey: 'AKIAJ2YZXJTN4A4XS7FA',
            secretKey: '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',
            statusSuccess: 201
        };
        this.setState({keyPrefix,newConfig});

    }

    SelectedTag(item,fileContain){
        this.setState({fileContain, tag: item});
        this.keyPrefixName();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to Abilisense Project!</Text>
                <TouchableOpacity onPress={this.takePic.bind(this)}>
                    <Text>take picture</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.takeVideo.bind(this)}>
                    <Text>take video</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.MoveToSoundRecordPage}>
                    <Text>take sound</Text>
                </TouchableOpacity>
                <Text>{this.state.fileContain.fileName}</Text>
                <Text>{this.state.fileContain.filePath}</Text>
                <Text>{this.state.newConfig.keyPrefix}</Text>

                <SearchableList SelectedTag={this.SelectedTag.bind(this)} fileContain = {this.state.fileContain}/>
                <TouchableOpacity onPress={this.UploadToAWS.bind(this)}>
                    <Text>Upload To Aws</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
