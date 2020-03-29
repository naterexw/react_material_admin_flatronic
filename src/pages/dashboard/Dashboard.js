import React, { useState } from 'react'
import {
    Grid,
    Box,
    TableRow,
    TableCell,
    Checkbox,
    TableHead,
    TableSortLabel,
    Toolbar,
    IconButton,
} from '@material-ui/core'
import { useTheme, makeStyles } from '@material-ui/styles'

// styles
import useStyles from './styles'

import logo from '../../images/rma-logo.svg'

// components
import Widget from '../../components/Widget'
import {  Typography, Link } from '../../components/Wrappers'
import {
    Delete as DeleteIcon,
    FilterList as FilterListIcon,
} from '@material-ui/icons'
import PropTypes from 'prop-types'
import { lighten } from '@material-ui/core/styles'
import cn from 'classnames'

// Recent Orders

const rows = [
    {
        id: 1,
        orderId: Math.floor(Math.random(0) * 3000000),
        customer: 'Victoria Cantrel',
        office: 'Croatia',
        weight: '1.4 kg',
        price: 23.87,
        purDate: '12 Jan 2019',
        delDate: '-',
        status: 'Pending',
        color: 'primary',
    },
    {
        id: 2,
        orderId: Math.floor(Math.random(0) * 3000000),
        customer: 'Cherokee Ware',
        office: 'Belgium',
        weight: '0.8 kg',
        price: 987,
        purDate: '11 Jan 2019',
        delDate: '14 Jan 2019',
        status: 'Delivered',
        color: 'success',
    },
    {
        id: 3,
        orderId: Math.floor(Math.random(0) * 3000000),
        customer: 'Constance Clayton',
        office: 'Peru',
        weight: '105 kg',
        price: 1.876,
        purDate: '09 Jan 2019',
        delDate: '-',
        status: 'Canceled',
        color: 'secondary',
    },
    {
        id: 4,
        orderId: Math.floor(Math.random(0) * 3000000),
        customer: 'Cherokee Ware',
        office: 'Belgium',
        weight: '0.8 kg',
        price: 987,
        purDate: '11 Jan 2019',
        delDate: '14 Jan 2019',
        status: 'Delivered',
        color: 'success',
    },
    {
        id: 5,
        orderId: Math.floor(Math.random(0) * 3000000),
        customer: 'Constance Clayton',
        office: 'Peru',
        weight: '105 kg',
        price: 1.876,
        purDate: '06 Jan 2019',
        delDate: '19 Jan 2019',
        status: 'In a process',
        color: 'warning',
    },
]

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1
    }
    if (b[orderBy] > a[orderBy]) {
        return 1
    }
    return 0
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0])
        if (order !== 0) return order
        return a[1] - b[1]
    })
    return stabilizedThis.map(el => el[0])
}

function getSorting(order, orderBy) {
    return order === 'desc'
        ? (a, b) => desc(a, b, orderBy)
        : (a, b) => -desc(a, b, orderBy)
}

const headCells = [
    {
        id: 'id',
        numeric: true,
        disablePadding: true,
        label: 'Order ID',
    },
    { id: 'customer', numeric: true, disablePadding: false, label: 'Customer' },
    { id: 'office', numeric: true, disablePadding: false, label: 'Office' },
    {
        id: 'weight',
        numeric: true,
        disablePadding: false,
        label: 'Netto Weight',
    },
    { id: 'price', numeric: true, disablePadding: false, label: 'Price' },
    {
        id: 'purchase-date',
        numeric: true,
        disablePadding: false,
        label: 'Date of purchase',
    },
    {
        id: 'delivery-date',
        numeric: true,
        disablePadding: false,
        label: 'Date of Delivery',
    },
    { id: 'status', numeric: true, disablePadding: false, label: 'Status' },
]

function Dashboard() {
    var classes = useStyles()
    var theme = useTheme()

    // local
    var [mainChartState, setMainChartState] = useState('monthly')

    // Recent Orders table

    const [order, setOrder] = React.useState('asc')
    const [orderBy, setOrderBy] = React.useState('price')
    const [selected, setSelected] = React.useState([])
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(5)

    const handleRequestSort = (event, property) => {
        const isDesc = orderBy === property && order === 'desc'
        setOrder(isDesc ? 'asc' : 'desc')
        setOrderBy(property)
    }

    const handleSelectAllClick = event => {
        if (event.target.checked) {
            const newSelecteds = rows.map(n => n.id)
            setSelected(newSelecteds)
            return
        }
        setSelected([])
    }

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name)
        let newSelected = []

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name)
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1))
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1))
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            )
        }

        setSelected(newSelected)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const isSelected = name => selected.indexOf(name) !== -1

    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

    const randomData = React.useMemo(() => getRandomData(10), [])

    const mainChartData = React.useMemo(() => {
        var resultArray = []
        var tablet = getRandomData(31, 3500, 6500, 7500, 1000)
        var desktop = getRandomData(31, 1500, 7500, 7500, 1500)
        var mobile = getRandomData(31, 1500, 7500, 7500, 1500)

        for (let i = 0; i < tablet.length; i++) {
            resultArray.push({
                tablet: tablet[i].value,
                desktop: desktop[i].value,
                mobile: mobile[i].value,
            })
        }

        return resultArray
    }, [mainChartState])

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <Widget
                    title="Example Widget"
                    bodyClass={classes.fullHeightBody}
                    className={classes.card}
                >
                    <Grid item container alignItems={'center'} justify={"space-between"}>
                        <Grid item xs={6} direction={'column'} container alignItems={"center"} >
                            <img src={logo} alt="React Material Admin Full" />
                            <span>
                                Made by{' '}
                                <Link href={'https://flatlogic.com/'} color={"primary"}>
                                    Flatlogic
                                </Link>
                                .
                            </span>
                        </Grid>
                        <Grid item xs={6}>
                            React Material Admin is easily customizable
                            dashboard template built with Material-UI framework.
                            Three colors themes, hundreds of components and
                            pages, modular architecture and latest industry best
                            practices - all you need to start modern material
                            application. No jQuery and Bootstrap! It will be a
                            great start to build E-Commerce, SASS, project
                            management and other web applications!
                        </Grid>
                    </Grid>
                </Widget>
            </Grid>
        </Grid>
    )
}

// #######################################################################

function getRandomData(length, min, max, multiplier = 10, maxDiff = 10) {
    var array = new Array(length).fill()
    let lastValue

    return array.map((item, index) => {
        let randomValue = Math.floor(Math.random() * multiplier + 1)

        while (
            randomValue <= min ||
            randomValue >= max ||
            (lastValue && randomValue - lastValue > maxDiff)
        ) {
            randomValue = Math.floor(Math.random() * multiplier + 1)
        }

        lastValue = randomValue

        return { value: randomValue }
    })
}

export default Dashboard
