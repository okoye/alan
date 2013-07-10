//
//  Common.h
//  Ever
//
//  Contains common definitions across methods across ever state.
//
//  Created by Chuka Okoye on 7/6/13.
//  Copyright (c) 2013 Lightcurve Labs. All rights reserved.
//

#ifndef Ever_Common_h
#define Ever_Common_h

#define EVER_DEBUG_MODE 1

#define IS_WIDESCREEN ( fabs( ( double )[ [ UIScreen mainScreen ] bounds ].size.height - ( double )568 ) < DBL_EPSILON )
#define IS_IPHONE ( [ [ [ UIDevice currentDevice ] model ] isEqualToString: @"iPhone" ] )
#define IS_IPOD   ( [ [ [ UIDevice currentDevice ] model ] isEqualToString: @"iPod touch" ] )
#define IS_IPHONE_5 ( IS_IPHONE && IS_WIDESCREEN )

#endif
