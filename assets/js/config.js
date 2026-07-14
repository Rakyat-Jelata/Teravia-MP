/* =====================================================
   TERAVIA - Global Configuration
   File: assets/js/config.js
===================================================== */


/**
 * TERAVIA APPLICATION CONFIG
 */

const TERAVIA_CONFIG = {

    // Application Info
    APP_NAME: "TERAVIA",

    APP_TAGLINE:
        "JUAL - BELI - SEWA PROPERTI SELURUH INDONESIA",


    // Environment
    ENVIRONMENT: "development",


    // Website URL
    BASE_URL: window.location.origin,


    // Pagination
    PAGINATION: {
        DEFAULT_LIMIT: 12,
        MAX_LIMIT: 50
    },


    // Currency
    CURRENCY: {
        CODE: "IDR",
        LOCALE: "id-ID"
    },


    // Membership
    MEMBERSHIP: {

        PREMIUM_PRICE: 50000,

        TYPE: "lifetime",

        STATUS: {
            ACTIVE: "active",
            PENDING: "pending",
            EXPIRED: "expired"
        }

    },


    // User Roles
    ROLES: {

        ADMIN: "admin",

        OWNER:
            "owner",

        BROKER:
            "broker",

        BUYER:
            "buyer"

    },


    // Property Status
    PROPERTY_STATUS: {

        PENDING:
            "pending",

        APPROVED:
            "approved",

        REJECTED:
            "rejected",

        SOLD:
            "sold",

        RENTED:
            "rented"

    },


    // Property Categories
    PROPERTY_CATEGORY: {

        RESIDENTIAL:
            "Hunian",

        COMMERCIAL:
            "Komersial",

        LAND:
            "Tanah & Lahan",

        INSTITUTION:
            "Institusi & Fasilitas"

    },


    // Legal Documents
    LEGALITY: [

        "SHM",

        "SHGB",

        "AJB",

        "Girik",

        "Letter C",

        "HGU",

        "Hak Pakai",

        "Lainnya"

    ],


    // Storage
    STORAGE: {

        PROPERTY_IMAGES:
            "property-images",

        PROFILE_IMAGES:
            "profile-images",

        BLOG_IMAGES:
            "blog-images"

    },


    // Notification Duration
    TOAST_DURATION:
        3000

};


/**
 * Export Global Config
 */

window.TERAVIA_CONFIG = TERAVIA_CONFIG;
