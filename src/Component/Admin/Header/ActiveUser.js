import React, { Component } from 'react'
import ViewUser from '../ViewUser'

export default class ActiveUser extends Component {
    render() {
        return (
            <div>
                <h1>Active User</h1>
                <ViewUser />
            </div>
        )
    }
}
