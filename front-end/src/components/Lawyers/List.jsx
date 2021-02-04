import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Card from './Card';
import { Modal, Button } from 'react-bootstrap'
import { Editor } from '@tinymce/tinymce-react';


const specialities = [
    { value: 'divorce', label: 'Family/Divorce' },
    { value: 'civil', label: 'Civil' },
    { value: 'accident/injury', label: 'Accident/Injury' },
    { value: 'ciminal', label: 'Criminal' },
    { value: 'corporate', label: 'Corporate' },
    { value: 'employment', label: 'Employment' },
    { value: 'bankruptcy', label: 'Bankruptcy' },
]
class List extends React.Component {
    static urlParams = new URLSearchParams(window.location.search);
    constructor(props) {
        super(props);
        this.state = {
            lawyers: [],
            addModal: false,
            zipCode: List.urlParams.get('zipCode'),
            search: '',
            addInfo: {
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                password: '',
                star: '',
                description: '',
                specialities: [],
                zipCode: ''
            }
        }
        this.toggleAddModal = this.toggleAddModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.addLawyer = this.addLawyer.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleSpeciality = this.handleSpeciality.bind(this);
    }
    handleChange(e) {
        this.setState({
            addInfo: {
                ...this.state.addInfo,
                [e.target.name]: e.target.value
            }
        })
    }
    handleDescription(description) {
        this.setState({
            addInfo: {
                ...this.state.addInfo,
                description
            }
        })
    }
    handleSpeciality({ target: { value } }) {
        const { specialities } = this.state.addInfo;
        console.log(specialities.includes(value))
        this.setState({
            addInfo: {
                ...this.state.addInfo,
                specialities: specialities.includes(value) ? specialities.filter(e => e != value) : [...specialities, value]
            }
        })
    }
    handleSearch(e) {
        this.setState({
            search: e.target.value
        }, this.getLawyers)
    }
    toggleAddModal() {
        this.setState({
            addModal: !this.state.addModal
        })
    }
    componentDidMount() {
        this.getLawyers();
    }
    getLawyers() {
        axios.get(`http://localhost:5003/lawyer/list?query=${this.state.search}&zipCode=${this.state.zipCode}`).then(res => {
            this.setState({
                lawyers: res.data
            })
        })
    }
    addLawyer(e) {
        e.preventDefault();
        axios.post('http://localhost:5003/lawyer/add', this.state.addInfo).then(res => {
            console.log(res)
            this.setState({
                lawyers: res.data,
                addModal: false
            })
        })
    }
    render() {
        const { lawyers, addModal, addInfo, search } = this.state;
        const { firstName, lastName, email, phone, zipCode, password } = addInfo;
        return <div className="content">
            <div className="container">
                <div className="page-header">
                    <div className="col-6 col-md-5 flex-none">
                        <h1 className="page-title">Lawyers</h1>
                    </div>
                    <div className="page-options d-flex justify-content-end">
                        {this.props.role === 'ADMIN' && <div>
                            <button className="btn btn-primary mr-2" onClick={this.toggleAddModal}>Add Lawyer</button>
                        </div>}
                        <form className="input-icon">
                            <input type="search" className="form-control header-search" placeholder="Search" value={search} onChange={this.handleSearch} />
                            <div className="input-icon-addon">
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon ison-sm"><circle cx={11} cy={11} r={8} /><line x1={21} y1={21} x2="16.65" y2="16.65" /></svg>
                            </div>
                        </form>
                        <Modal show={addModal} onHide={this.toggleAddModal} size="xl">
                            <Modal.Header closeButton>
                                <Modal.Title>Add Lawyer</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form onSubmit={this.addLawyer}>
                                    <div className="form-group row">
                                        <div className="col-6">
                                            <label className="form-label">Prénom:</label>
                                            <input name="firstName" className="form-control" value={firstName} onChange={this.handleChange} type="text" />
                                        </div>
                                        <div className="col-6">
                                            <label className="form-label">Nom:</label>
                                            <input name="lastName" className="form-control" value={lastName} onChange={this.handleChange} type="text" />
                                        </div>
                                        <div className="col-6">
                                            <label className="form-label">Phone:</label>
                                            <input name="phone" className="form-control" value={phone} onChange={this.handleChange} type="text" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Password:</label>
                                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Email:</label>
                                        <input name="email" className="form-control" value={email} onChange={this.handleChange} type="email" />
                                    </div>
                                    <div className="form-group">
                                        <div className="form-label">Specialities:</div>
                                        <div>
                                            {
                                                specialities.map(e => (<label className="form-check form-check-inline">
                                                    <input onChange={this.handleSpeciality} checked={this.state.addInfo.specialities.includes(e.value)} type="checkbox" value={e.value} className="form-check-input" />
                                                    <span className="form-check-label">{e.label}</span>
                                                </label>))
                                            }
                                        </div>
                                    </div>
                                    <duv className="form-group">
                                        <label htmlFor="" className="form-label">Zip Code:</label>
                                        <input type="text" name="zipCode" value={zipCode} onChange={this.handleChange} className="form-control" />
                                    </duv>
                                    <div className="form-group">
                                        <label htmlFor="" className="form-label">Description:</label>
                                        <Editor
                                            id="details"
                                            onEditorChange={this.handleDescription}
                                            init={{
                                                height: 500,
                                                menubar: false,
                                                branding: false,
                                                /*                                         language_url: i18n.getLocale().includes('en') ? null : `/tinymce/langs/${i18n.getLocale().replace('-', '_')}.js`,
                                                                                    language: i18n.getLocale().includes('en') ? null : i18n.getLocale().replace('-', '_'), */
                                                plugins: [
                                                    'advlist autolink lists link image charmap print preview anchor',
                                                    'searchreplace visualblocks fullscreen',
                                                    'insertdatetime media table paste'
                                                ],
                                                toolbar:
                                                    'undo redo | formatselect | bold italic backcolor | \
                                            alignleft aligncenter alignright alignjustify | \
                                            bullist numlist outdent indent | removeformat | image | media'
                                            }}
                                        />
                                    </div>
                                </form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.toggleAddModal}>
                                    Annuler
          </Button>
                                <Button variant="success" onClick={this.addLawyer}>
                                    Ajouter
          </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>

                <div className="row">
                    {lawyers.map(e => <Card key={e._id} info={e} />)}
                </div>
            </div>
        </div>
    }
}
const mapStateToProps = ({ auth }) => ({
    role: auth.role
})
export default connect(mapStateToProps, null)(List);