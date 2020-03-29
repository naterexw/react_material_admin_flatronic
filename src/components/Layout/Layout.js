import React from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import classnames from 'classnames'
import {
    IconButton,
    Box,
    Grid,
    Breadcrumbs,
    Tab,
} from '@material-ui/core'
import {
    NavigateNext as NavigateNextIcon,
    ChatBubbleOutline as ChatIcon,
    AddShoppingCart as AddIcon,
    StarBorder as StarIcon,
} from '@material-ui/icons'
import { withStyles } from '@material-ui/styles'

// styles
import useStyles from './styles'

// components
import Header from '../Header'
import Sidebar from '../Sidebar'
import Footer from '../Footer'
import Widget from '../Widget'
import { Link, Typography } from '../../components/Wrappers'

// pages
import Dashboard from '../../pages/dashboard'
import AnotherPage from '../../pages/another-page'

// context
import { useLayoutState } from '../../context/LayoutContext'

//Sidebar structure
import structure from '../Sidebar/SidebarStructure'

// Tab styling

const CustomTab = withStyles(theme => ({
    root: {
        minWidth: 72,
        textTransform: 'none',
        fontWeight: 400,
    },
}))(props => <Tab {...props} />)

function Layout(props) {
    const classes = useStyles()
    const [value, setValue] = React.useState(2)
    const [anchorEl, setAnchorEl] = React.useState(null)

    const open = Boolean(anchorEl)
    const id = open ? 'add-section-popover' : undefined
    const handleClick = event => {
        setAnchorEl(open ? null : event.currentTarget)
    }

    // global
    var layoutState = useLayoutState()

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        }
    }

    return (
        <div className={classes.root}>
            <Header history={props.history} />
            <Sidebar structure={structure} />
            <div
                className={classnames(classes.content, {
                    [classes.contentShift]: layoutState.isSidebarOpened,
                })}
            >
                <div className={classes.fakeToolbar} />
                <Widget
                    disableWidgetMenu
                    inheritHeight
                    className={classes.margin}
                    bodyClass={classes.navPadding}
                >
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                        wrap={'nowrap'}
                        style={{ overflowX: 'auto' }}
                    >
                        {structure.map(c => {
                            if (
                                !c.children &&
                                window.location.hash.includes(c.link) &&
                                c.link
                            ) {
                                return (
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        key={c.id}
                                    >
                                        <Breadcrumbs aria-label="breadcrumb">
                                            <Typography variant="h4">
                                                {c.label}
                                            </Typography>
                                        </Breadcrumbs>
                                    </Box>
                                )
                            } else if (c.children) {
                                return c.children.map(currentInner => {
                                    if (
                                        window.location.hash.includes(
                                            currentInner.link
                                        )
                                    ) {
                                        return (
                                            <Breadcrumbs
                                                separator={
                                                    <NavigateNextIcon fontSize="small" />
                                                }
                                                aria-label="breadcrumb"
                                                key={c.id}
                                            >
                                                <Typography variant={'h6'}>
                                                    {c.label}
                                                </Typography>
                                                <Typography
                                                    variant={'h6'}
                                                    color="primary"
                                                >
                                                    {currentInner.label}
                                                </Typography>
                                            </Breadcrumbs>
                                        )
                                    } else {
                                        return null
                                    }
                                })
                            } else {
                                return null
                            }
                        })}

                        {window.location.hash.includes('/app/ecommerce') && (
                            <Box display="flex" alignItems="center">
                                <Box>
                                    <IconButton aria-label="chat">
                                        <ChatIcon
                                            className={classes.ecommerceIcon}
                                        />
                                    </IconButton>
                                </Box>
                                <Box>
                                    <IconButton aria-label="add_to_cart">
                                        <AddIcon
                                            className={classes.ecommerceIcon}
                                        />
                                    </IconButton>
                                </Box>
                                <Box>
                                    <IconButton aria-label="rate">
                                        <StarIcon
                                            className={classes.ecommerceIcon}
                                        />
                                    </IconButton>
                                </Box>
                            </Box>
                        )}
                    </Grid>
                </Widget>
                <Switch>
                    <Route path="/app/dashboard" component={Dashboard} />
                    <Route path={"/app/another-page"} component={AnotherPage}/>
                </Switch>
                <Footer>
                    <div>
                        <Link
                            color={'primary'}
                            href={'https://flatlogic.com/'}
                            target={'_blank'}
                            className={classes.link}
                        >
                            Flatlogic
                        </Link>
                        <Link
                            color={'primary'}
                            href={'https://flatlogic.com/about'}
                            target={'_blank'}
                            className={classes.link}
                        >
                            About Us
                        </Link>
                        <Link
                            color={'primary'}
                            href={'https://flatlogic.com/blog'}
                            target={'_blank'}
                            className={classes.link}
                        >
                            Blog
                        </Link>
                    </div>
                </Footer>
            </div>
        </div>
    )
}

export default withRouter(Layout)
