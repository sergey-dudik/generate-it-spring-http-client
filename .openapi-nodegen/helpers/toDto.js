exports.default = (name) =>
    ! name || name.includes('.') ? name : `com.acrontum.template.dtos.${name}Dto`;