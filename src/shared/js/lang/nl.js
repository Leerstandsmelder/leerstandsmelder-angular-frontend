'use strict';

module.exports = {
    generel: {
        yes: 'Yes',
        no: 'No',
    },
    actions: {
        cancel: 'Cancel',
        choose_images: 'You may choose one or more image to add to this entry.',
        choose_image: 'Add an image to this entry.',
        choose_camera: 'Camera',
        choose_photo: 'Choose an image',
        choose_library: 'Library',
        delete: 'Delete',
        dont_show_again: 'Don\'t show again',
        edit: 'Edit',
        edit_details: 'Edit details',
        next: 'Next',
        ok: 'OK',
        previous: 'Previous',
        show: 'View',
        submit: 'Submit',
        take_picture: 'Take a Picture',
        use_slider: 'Use the slider',
        abort: 'Abort',
        close: 'Close',
        more: 'Load more',
        back: 'Back'
    },
    table: {
        rowsPerPage: 'Rows per page',
        pageOf: 'of'
    },
    admin:{
        dashboard: 'Dashboard',
        menu: 'Menu'
    },
    menu: {
        admin: 'Administration',
        map: 'Map',
        user: 'User'
    },
    asset: {
        file: 'Datei'
    },
    author: {
        author: 'Author',
        by: 'by',
        created: 'Created',
        in: 'in',
        on: 'on',
        updated: 'Updated'
    },
    captcha: {
        enter_captcha: 'Enter the code'
    },
    comments: {
        all: 'Comments',
        manage_comments: 'Manage comments',
        update_comment: 'Update comments',
        comment: 'Comment',
        comment_plural: 'Comments',
        comment_text: 'Comment text',
        new_comment: 'New Comment',
        new_comment_login: 'Log in to post a new comment.',
        no_comments: 'No Comments',
        body: 'Message',
        hidden: 'Hide comment',
        created: 'Created'
    },
    creator: {
        tabs: {
            admin: 'Admin',
            details: 'Details',
            info: 'Info',
            location: 'Location',
            preview: 'Preview'
        }
    },
    errors: {
        access_denied: 'You are not allowed to perform this action.',
        authorization_failed: 'Login failed.',
        location: {
            'no_data': 'Location could not be loaded.'
        },
        region: {
            'no_data': 'Region could not be loaded.'
        },
        unknown: 'An unknown error occurred.',
        noconnection: 'The app could not reach the server. Try again later.',
        critical: {
          title: 'Critical error',
          resolve: 'Ok, try again?'
        },
        users: {
            confirmation_failed: 'Confirmation failed. This link might already be used.',
            email_exists: 'This email is already registered.',
            invalid_email: 'Invalid email.',
            password_confirm_mismatch: 'Passwords do not match.',
            password_too_short: 'Password is too short (min. 8 characters).',
            reset_failed: 'Password reset failed. This link is invalid and may have already been used.',
            too_many_failed_logins: 'Too many failed logins. Please try again in five minutes.'
        }
    },
    successes: {
      user: {
        login: 'You are now logged in.',
        logout: 'You have been logged out.'
      }
    },
    photos: {
        remove_confirm_title: 'Delete image?',
        remove_confirm_body: 'Are you sure that you want to delete this image?',
        remove_success: 'Image has been deleted.'
    },
    locations: {
        manage_locations: 'Manage locations',
        address: 'Address',
        building_type: 'Building Type',
        building_type_options: {
            residential: 'Residential',
            commercial: 'Commercial',
            industrial: 'Industrial',
            historical: 'Historical',
            public_work: 'Public Work',
            other: 'Other'
        },
        city: 'City',
        create_new: 'Submit location',
        update_location: 'Update location',
        degree: 'Degree of Emptiness',
        degree_options: {
            complete: 'Complete',
            partial: 'Partial'
        },
        description: 'Description',
        demolished: 'Demolished',
        demolished_yes: 'Yes',
        demolition_options: {
            rumor: 'Rumored',
            demolished: 'Demolished'
        },
        demolition_rumor: 'Rumors of Demolition',
        demolition_rumor_yes: 'Yes',
        edit: 'Edit Location',
        empty_for: 'Empty for',
        empty_options: {
            recently: 'just recently',
            min_five_years: 'at least 5 years',
            min_three_years: 'at least 3 years',
            min_one_year: 'at least a year',
            about_half_year: 'about half a year',
            less_than_one_quarter_year: 'less than one quarter of 1 year',
            less_than_one_half_year: 'less than one half of 1 year',
            less_than_three_quarters_year: 'less than three quarters of 1 year',
            less_than_one_year: 'less than 1 year',
            more_than_ten_years: 'more than 10 years',
            one_quarter: 'one quarter',
            one_half: 'one half',
            three_quarters: 'three quarters',
            year: 'year',
            year_plural: 'years',
            and: 'and'
        },
        help: {
            info: 'Enter a descriptive title and a description for this location.',
            location: 'Enter an address and the map should update after a short moment. You can drag the marker on the map to update the address.',
            details: 'Fill out those details that you know about the location. If you do not know something, just leave it blank.',
            admin: 'Set this Asset to "Hidden" to prevent non-administrators from seeing it.'
        },
        hidden: 'Hidden',
        hidden_yes: 'Yes',
        hidden_moderation: 'This location will not be displayed right now. Contact your locale LM crew to display this entry',
        location: 'Location',
        location_photos: 'Photos for this location',
        location_plural: 'Locations',
        locations_by_region: 'Locations by Region',
        my_locations: 'My Locations',
        no_recent_activity: 'No Recent Activity',
        none_found: 'No locations found.',
        owner: 'Owner',
        owner_options: {
            private: 'Private',
            business: 'Business',
            public: 'Public',
            city: 'City'
        },
        postcode: 'Postal code',
        recent_activity: 'Latest Activity',
        remove_confirm_title: 'Delete Location',
        remove_confirm_body: 'This action cannot be undone. Are you sure?',
        remove_success: 'Location deleted',
        search: 'Search',
        street: 'Street',
        title: 'Title',
        unknown: 'Unknown'
    },
    messages: {
        answer_message: 'Reply to Message',
        create_message: 'Create Message',
        message: 'Message',
        message_text: 'Message text',
        my_messages: 'Messages',
        sent: 'Sent',
        to: 'To',
        from: 'From',
        comments: {
            create_success: 'Comment successfully posted.'
        },
        locations: {
            create_success: 'Location created successfully.',
            update_success: 'Leerstand updated successfully.'
        },
        users: {
            confirmation_success: 'Successfully confirmed! You are now logged in.',
            create_success: 'Your registration was successful. Please check your emails for the confirmation link!',
            request_reset_success: 'Password reset requested. You should now get an email containing a link to reset your password.',
            reset_success: 'You are now logged in and may change your password.',
            update_success: 'Account was successfully updated.'
        }
    },
    popups: {
        relaunch: {
            title: 'Relaunch!'
        }
    },
    posts: {
        edit_post: 'Edit Post',
        manage_posts: 'Manage Posts',
        post: 'Post',
        post_plural: 'Posts',
        site_post_plural: 'Page content',
        title: 'Title',
        update_success: 'Post updated successfully.',
        create_post: 'Create post',
        slug: 'Slug URL',
        remove_confirm_title: 'Delete post',
        remove_confirm_body: 'This action can not be undone. Are you sure?',
        remove_success: 'Post has been deleted',
        static: 'Static side'
    },
    regions: {
        settings: 'Settings',
        hide_message: 'Message if Region is hidden',
        latitude: 'Latitude',
        longitude: 'Longitude',
        manage_regions: 'Manage Regions',
        create_regions: 'Create region',
        region: 'Region',
        region_plural: 'Regions',
        set_hide: 'Hide this Region',
        set_moderate: 'Moderate this Region',
        title: 'Title',
        update_success: 'Region updated successfully.',
        zoom: 'Zoom',
        count: 'Count',
        created: 'Created',
        updated: 'Updated',
    },
    site: {
        banned: 'Banned',
        copyright_notice: '© 2021 Leerstandsmelder.de',
        map_notice: 'Maps: © OpenStreetMap contributors, ODbL 1.0.',
        lang: 'Language',
        lang_de: 'Deutsch',
        lang_en: 'English',
        lang_nl: 'Nederlands',
        latest_posts: 'NL Recent Posts',
        no_latest_posts: 'No Recent Posts',
        no: 'No',
        subnav: {
            about: 'About',
            developers: 'Developers',
            feedback: 'Feedback',
            howto: 'Howto',
            imprint: 'Imprint',
            index: 'City index',
            press: 'Press',
            terms: 'Terms',
            dataprotection: 'Data protection'
        },
        title: 'Leerstandsmelder'
    },
    users: {
        manage_users: 'Manage users',
        create_user: 'Create user',
        admin_edit: 'Edit user',
        admin_create: 'Create user',
        anonymous: 'Not logged in',
        email: 'Email',
        forgot: 'Forgot Password',
        logout: 'Logout',
        password: 'Password',
        password_confirm: 'Confirm Password',
        settings: 'Settings',
        signup: 'Sign up',
        username: 'Username',
        login: 'Login',
        message_me: 'Other Users can send me messages via Leerstandsmelder.',
        notify: 'Send me an Email when my entries are updated or other users send me a message.',
        register_message: 'Register now!',
        all: 'All users',
        confirmed: "Confirmed",
        blocked: "Blocked",
        last_login: "Last login",
        failed_logins: "Failed logins",
        scope: "Scopes",
        created: 'Created',
        accept_terms: 'I have read the terms of service and accept these terms.',
        terms: 'Terms of service'
    }
};
