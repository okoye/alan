//
//  ScannerManager.swift
//  ScannerDarkly
//
//  Created by Chuka Okoye on 8/3/15.
//  Copyright (c) 2015 Humanly.co. All rights reserved.
//
//  Responsible for managing all scanning related functionality

import AVFoundation
import Foundation

class ScannerManager: AVCaptureMetadataOutputObjectsDelegate {
    
    private var session: AVCaptureSession
    private var preview: AVCaptureVideoPreviewLayer?
    private let device = AVCaptureDevice.defaultDeviceWithMediaType(AVMediaTypeVideo)
    
    init() {
        self.session = AVCaptureSession()
    }
    
    func start() {
        // Create all objects that can be recreated on the fly and then start session
        var error: NSError? = nil
        var input: AVCaptureDeviceInput? = AVCaptureDeviceInput.deviceInputWithDevice(device, error: &error) as? AVCaptureDeviceInput
        if input != nil {
            session.addInput(input)
        }
        else {
            //We should throw some kind of exception
            println("An error occured when setting up access to AudioVideo Device")
        }
        var output = AVCaptureMetadataOutput()
        output.setMetadataObjectsDelegate(self, queue: dispatch_get_main_queue())
        session.addOutput(output)
        output.metadataObjectTypes = output.availableMetadataObjectTypes
    }
    
    func captureOutput(captureOutput: AVCaptureOutput!, didOutputMetadataObjects metadataObjects: [AnyObject]!, fromConnection connection: AVCaptureConnection!) {
        // Callback made after we find a known barcode type with camera
    }
}
