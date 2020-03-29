import React from 'react'
import {
    Home as HomeIcon,
    FilterNone as UIElementsIcon,
    BorderAll as TableIcon,
    QuestionAnswer as SupportIcon,
    LibraryBooks as LibraryIcon,
    HelpOutline as FAQIcon,
    BarChart as ChartIcon,
    Map as MapIcon,
    Apps as CoreIcon,
    Description as DescriptionIcon,
    ShoppingCart as ShoppingCartIcon,
    StarBorder as ExtraIcon,
    Chat as ChatIcon,
    Add as AddSectionIcon,
    FolderOpen as FolderIcon,
    Description as DocumentationIcon,
    Person as UserIcon,
} from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'

// components
import Dot from './components/Dot'

const structure = [
    { id: 0, label: 'Dashboard', link: '/app/dashboard', icon: <HomeIcon /> },
    { id: 1, label: 'Another Page', link: '/app/another-page', icon: <DocumentationIcon /> },
    { id: 2, type: 'divider' },
    { id: 3, type: 'title', label: 'HELP' },
    { id: 4, label: 'Library', link: '', icon: <LibraryIcon /> },
    { id: 5, label: 'Support', link: '', icon: <SupportIcon /> },
    { id: 6, label: 'FAQ', link: '', icon: <FAQIcon /> },
    { id: 7, type: 'divider' },
    { id: 8, type: 'title', label: 'PROJECTS' },
    {
        id: 9,
        label: 'My recent',
        link: '',
        icon: <Dot size="medium" color="secondary" />,
    },
    {
        id: 10,
        label: 'Starred',
        link: '',
        icon: <Dot size="medium" color="primary" />,
    },
    {
        id: 11,
        label: 'Background',
        link: '',
        icon: <Dot size="medium" color="secondary" />,
    },
    { id: 12, type: 'divider' },
    {
        id: 13,
        label: 'Add section',
        icon: <AddSection />,
        click: function(event, ...rest) {
            const name = 'addSectionClick'
            rest.forEach(c => {
                if (c.clickName === name) {
                    return c(event)
                }
                return false
            })
        },
    },
    { id: 14, type: 'divider' },
    { id: 15, type: 'margin' },
    { id: 16, type: 'divider' },
]

function AddSection() {
    const useStyles = makeStyles(theme => ({
        root: {
            backgroundColor: theme.palette.secondary.main,
            borderRadius: '50%',
            height: 30,
            width: 30,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
        },
    }))

    const classes = useStyles()

    return (
        <section className={classes.root}>
            <AddSectionIcon />
        </section>
    )
}

export default structure
