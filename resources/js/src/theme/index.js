
import { createTheme } from '@mui/material/styles';

export const AppTheme = createTheme({
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: '#fff',
                    color: '#313233',
                    border: 'none',
                }
            }
        },
    },
    palette: {
        common: {
            black: '#000',
            white: '#fff'
        },
        primary: {
            main: '#384E54',
            light: '#8B9DA0',
            dark: '#232E3A',
            contrastText: '#F5F9FA',
        },
        secondary: {
            main: '#EAEAEA',
            light: '#FAFBFC',
            dark: '#EAEAEA',
            contrastText: '#767C80',
        },
        background: {
            default: '#fff',
            paper: '#fff',
        },
        text: {
            primary: '#18191B',
            secondary: '#384E54',
            others: {
                light_gray: '#838383',
                dark_gray: '#313233',
                dark_blue: '#232E3A',
            },
            disabled: '#8D9599',
        },
        // error: {
        //     main: '',
        //     light: '',
        //     dark: '',
        //     contrastText: '',
        // },
        warning: {
            main: '#fff',
            light: '#F4E9DF',
            dark: '#fff',
            contrastText: '#8A5034',
        },
        info: {
            main: '#8B9DA066',
            light: '#DCE3E5',
            dark: '#232E3A',
            contrastText: '#181919',
        },
        // success: {
        //     main: '',
        //     light: '',
        //     dark: '',
        //     contrastText: '',
        // },
    },
    shape: {
        borderRadius: 6,
        box: {
            form: {
                width: 'auto',
                m: '25px 0 0',
                p: '24px',
                backgroundColor: 'common.white',
                borderRadius: '8px',
                boxShadow: '0 0 12px -8px',
            },
            details: {
                width: 'auto',
                m: '25px 0 0',
                p: '16px 22px 18px 18px',
                backgroundColor: 'common.white',
                borderRadius: '8px',
                boxShadow: '0 0 12px -8px',
            },
            tag: {
                warning: {
                    ml: '7px',
                    p: '5px 9px',
                    color: 'warning.contrastText',
                    backgroundColor: 'warning.light',
                    borderRadius: '100px',
                }
            },
            flex: {
                AStart_JBetween: {
                    display: 'flex',
                    alignItems: 'start',
                    justifyContent: 'space-between',
                },
                ACenter_JStart: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'start',
                },
                ACenter_JBetween: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                },
                ACenter_JEnd: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'end',
                },
                AEnd_JBetween: {
                    display: 'flex',
                    alignItems: 'end',
                    justifyContent: 'space-between',
                },
            },
        },
        table: {
            list_1: {
                width: 'auto',
                m: '25px 0 0',
                p: '10px 10px 22px',
                boxShadow: '0 0 12px -8px',
            },
            list_2: {
                width: 'auto',
                m: '25px 0 0',
                p: '10px 10px 22px',
                backgroundColor: 'transparent',
                boxShadow: 'none',
            },
        },
    },
    typography: {
        htmlFontSize: 16,
        fontFamily: 'Poppins',
        fontFamilies: {
            poppins: 'Poppins',
            ibarraRealNova: 'Ibarra Real Nova',
            leagueSpartan: 'League Spartan',
        },
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 600,
        fontWeightBold: 700,
        h1: {
            fontFamily: 'Ibarra Real Nova',
            fontWeight: 700,
            fontSize: '35px',
            lineHeight: '52px',
            // letterSpacing: 0,
        },
        h2: {
            fontFamily: 'Ibarra Real Nova',
            fontWeight: 600,
            fontSize: '28px',
            lineHeight: '32px',
            // letterSpacing: 0,
        },
        h3: {
            fontFamily: 'Ibarra Real Nova',
            fontWeight: 600,
            fontSize: '22px',
            lineHeight: '33px',
            // letterSpacing: 0,
        },
        subtitle1: {
            fontFamily: 'Poppins',
            fontWeight: 400,
            fontSize: '12px',
            // lineHeight: '18px',
            // letterSpacing: 0,
        },
        body1: {
            fontFamily: 'Ibarra Real Nova',
            fontWeight: 600,
            fontSize: '19px',
            // lineHeight: '24px',
            // letterSpacing: 0,
        },
        body2: {
            fontFamily: 'League Spartan',
            fontWeight: 400,
            fontSize: '16px',
            // lineHeight: '24px',
            // letterSpacing: 0,
        },
        body3: {
            fontFamily: 'Poppins',
            fontWeight: 400,
            fontSize: '16px',
            // lineHeight: '24px',
            // letterSpacing: 0,
        },
        body4: {
            fontFamily: 'Poppins',
            fontWeight: 400,
            fontSize: '14px',
            // lineHeight: '21px',
            // letterSpacing: 0,
        },
        body5: {
            fontFamily: 'Poppins',
            fontWeight: 600,
            fontSize: '16px',
            // lineHeight: '24px',
            // letterSpacing: 0,
        },
        tRow1: {
            fontFamily: 'League Spartan',
            fontWeight: 400,
            fontSize: '16px',
            // lineHeight: '24px',
            // letterSpacing: 0,
        },
        tRow2: {
            fontFamily: 'League Spartan',
            fontWeight: 400,
            fontSize: '12px',
            // lineHeight: '18px',
            // letterSpacing: 0,
        },
        tRow3: {
            fontFamily: 'League Spartan',
            fontWeight: 400,
            fontSize: '14px',
            // lineHeight: '21px',
            // letterSpacing: 0,
        },
        button1: {
            minWidth: '161px',
            height: '40px',
            p: '6px 12px',
            fontFamily: 'Poppins',
            fontWeight: 600,
            fontSize: '16px',
            // lineHeight: '24px',
            // letterSpacing: 0,
            color: 'common.white',
            backgroundColor: 'primary.main',
            borderRadius: '6px',
        },
        button2: {
            minWidth: '161px',
            height: '40px',
            p: '6px 12px',
            fontFamily: 'Poppins',
            fontWeight: 600,
            fontSize: '16px',
            // lineHeight: '24px',
            // letterSpacing: 0,
            color: 'text.secondary',
            backgroundColor: 'transparent',
            border: '1px solid #384E54',
            borderRadius: '6px',
        },
        button3: {
            height: '40px',
            p: '6px 12px',
            fontFamily: 'Poppins',
            fontWeight: 600,
            fontSize: '16px',
            // lineHeight: '24px',
            // letterSpacing: 0,
            color: 'primary.main',
            backgroundColor: 'transparent',
            textDecoration: 'underline !important',
        },
        btnDisabled: {
            color: 'text.disabled',
            backgroundColor: 'transparent',
            border: '1px solid #8D9599',
        },
        overline: {
            fontFamily: 'Poppins',
            fontWeight: 400,
            fontSize: '16px',
            // lineHeight: '24px',
            // letterSpacing: 0,
        },
    },
});
