/* This file is part of Indico.
 * Copyright (C) 2002 - 2018 European Organization for Nuclear Research (CERN).
 *
 * Indico is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation; either version 3 of the
 * License, or (at your option) any later version.
 *
 * Indico is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Indico; if not, see <http://www.gnu.org/licenses/>.
 */
import {connect} from 'react-redux';
import RoomDetailsModal from '../components/modals/RoomDetailsModal';
import {setFilterParameter, fetchRooms, fetchMapRooms} from '../actions';


export default (namespace) => {
    const mapStateToProps = state => ({
        equipmentTypes: state.equipment.types,
        ...state[namespace].filters,
        hasOwnedRooms: state.user.hasOwnedRooms,
        hasFavoriteRooms: Object.values(state.user.favoriteRooms).some(fr => fr),
        namespace
    });

    const mapDispatchToProps = dispatch => ({
        setFilterParameter: (param, value) => {
            dispatch(setFilterParameter(namespace, param, value));
            dispatch(fetchRooms(namespace));
            dispatch(fetchMapRooms(namespace));
        }
    });

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(RoomDetailsModal);
};
